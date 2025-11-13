import * as THREE from 'three';

/**
 * Default configuration for the gallery
 */
const DEFAULT_CONFIG = {
    // Responsive column breakpoints
    columns: {
        mobile: 1,        // < 480px
        small: 2,         // 480px - 768px
        medium: 3,        // 768px - 968px
        large: 4,         // 968px - 1200px
        xlarge: 5,        // 1200px - 1600px
        xxlarge: 6        // > 1600px
    },

    // Layout spacing
    layout: {
        columnWidth: 1.8,
        horizontalGap: 0.4,
        verticalGap: 0.5,
        maxFloatAmplitude: 0.025
    },

    // Animation settings
    animation: {
        introSpeed: 2.0,
        damping: 0.1,
        floatingEnabled: true,
        reducedMotionSpeed: 0.5,
        // Gallery-wide floating (entire gallery moves together)
        galleryFloatAmplitudeX: 0.08,  // Increased amplitude
        galleryFloatAmplitudeY: 0.06,
        galleryFloatSpeedX: 0.3,       // Slower, more dramatic
        galleryFloatSpeedY: 0.25,
        // Momentum/inertia
        inertiaEnabled: true,
        friction: 0.85,
        velocityMultiplier: 0.8,
        // Hover effects
        hoverScale: 1.05,
        hoverSpeed: 0.15,
        // LOD transitions
        lodCrossfadeSpeed: 0.08
    },

    // Camera controls
    camera: {
        initialZoom: 1.8,
        minZoom: 1.4,        // Reduced zoom out distance
        maxZoom: 3.5,
        boundaryX: 8,
        boundaryY: 20,
        frustumSize: 10
    },

    // LOD (Level of Detail) thresholds - prioritize quality
    lod: {
        low: { min: 0, max: 1.2, width: 800 },
        medium: { min: 1.0, max: 2.0, width: 1200 },
        high: { min: 1.5, max: Infinity, width: 1600 }
    },

    // Renderer settings - premium quality
    renderer: {
        antialias: true,  // Enable for smoother edges
        alpha: true,
        powerPreference: 'high-performance',
        maxPixelRatio: window.devicePixelRatio, // Use full device resolution
        shadowMap: true,
        toneMapping: true
    },

    // Visual effects
    effects: {
        shadows: true,
        depthOfField: false,  // Can be enabled for dramatic effect
        bloom: true,
        vignette: true,
        imageReflections: true,
        parallaxStrength: 0.03
    },

    // Network settings
    network: {
        maxRetries: 3,
        timeout: 10000,
        retryDelay: 1000
    }
};

/**
 * CanvasGallery - A high-performance Three.js-based masonry image gallery
 * Features: Dynamic LOD, responsive layout, smooth animations, touch support
 */
class CanvasGallery {
    /**
     * @param {Object} config - Optional configuration overrides
     */
    constructor(config = {}) {
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }

        // Merge user config with defaults
        this.config = this.mergeConfig(DEFAULT_CONFIG, config);

        // Three.js core objects
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.images = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Advanced lighting
        this.lights = {
            ambient: null,
            directional: null,
            spotlight: null
        };

        // Shadow plane for depth perception
        this.shadowPlane = null;

        // Camera controls state
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.cameraTarget = { x: 0, y: 0 };
        this.cameraPosition = { x: 0, y: 0 };
        this.zoom = this.config.camera.initialZoom;
        this.targetZoom = this.config.camera.initialZoom;

        // Momentum/inertia for natural dragging
        this.velocity = { x: 0, y: 0 };
        this.friction = 0.85;
        this.lastDragDelta = { x: 0, y: 0 };
        this.dragHistory = [];

        // Hover state
        this.hoveredImage = null;
        this.hoverProgress = 0;

        // Grid center (set after creating masonry grid)
        this.gridCenterY = 0;

        // Animation timing
        this.time = 0;
        this.lastTimestamp = 0;
        this.introAnimationProgress = 0;

        // Performance: Render-on-demand
        this.needsRender = true;
        this.animationId = null;

        // Texture management
        this.textureLoader = new THREE.TextureLoader();
        this.loadingSpinners = [];

        // Loading progress tracking
        this.totalImagesToLoad = 0;
        this.imagesLoaded = 0;
        this.loadingProgressBar = document.getElementById('loadingProgress');
        this.loadingPercent = document.getElementById('loadingPercent');
        this.loadingScreen = document.getElementById('loadingScreen');

        // Responsive design
        this.currentColumns = this.calculateColumns();

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.prefersReducedMotion) {
            this.config.animation.introSpeed = this.config.animation.reducedMotionSpeed;
            this.config.animation.floatingEnabled = false;
        }

        // Gallery-wide floating animation (entire gallery moves together)
        this.galleryFloatPhaseX = Math.random() * Math.PI * 2;
        this.galleryFloatPhaseY = Math.random() * Math.PI * 2;

        // Aspect ratios for varied layout
        this.aspectRatios = [
            1.2, 1.5, 1.8, 1.3, 1.6, 1.4, 2.0, 1.1, 1.7,
            1.35, 1.45, 1.55, 1.65, 1.75, 1.25, 1.85, 1.95
        ];

        // Event handlers (stored for cleanup)
        this.boundHandlers = {
            mousedown: null,
            mousemove: null,
            mouseup: null,
            dblclick: null,
            wheel: null,
            resize: null,
            touchstart: null,
            touchmove: null,
            touchend: null
        };

        // Initialize
        if (this.init()) {
            this.createMasonryGrid().catch(error => {
                console.error('Failed to initialize gallery:', error);
                this.showErrorMessage('Failed to load gallery. Please refresh the page.');
            });
            this.addEventListeners();
            this.animate();
        }
    }

    /**
     * Deep merge configuration objects
     */
    mergeConfig(defaults, overrides) {
        const result = { ...defaults };
        for (const key in overrides) {
            if (overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(overrides[key])) {
                result[key] = this.mergeConfig(defaults[key] || {}, overrides[key]);
            } else {
                result[key] = overrides[key];
            }
        }
        return result;
    }

    /**
     * Calculate number of columns based on viewport width
     */
    calculateColumns() {
        const width = window.innerWidth;
        const { columns } = this.config;

        if (width < 480) return columns.mobile;
        if (width < 768) return columns.small;
        if (width < 968) return columns.medium;
        if (width < 1200) return columns.large;
        if (width < 1600) return columns.xlarge;
        return columns.xxlarge;
    }

    /**
     * Initialize Three.js scene, camera, and renderer
     * @returns {boolean} Success status
     */
    init() {
        // Check WebGL support
        const gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL is not supported');
            this.showErrorMessage('WebGL is not supported in your browser. Please use a modern browser.');
            return false;
        }

        // Scene with transparent background
        this.scene = new THREE.Scene();
        this.scene.background = null;  // Transparent background
        // Fog removed for transparent background

        // Camera (orthographic for 2D-like view)
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = this.config.camera.frustumSize;
        this.camera = new THREE.OrthographicCamera(
            frustumSize * aspect / -2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / -2,
            0.1,
            1000
        );
        this.camera.position.z = 10;

        // Renderer with premium settings
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: this.config.renderer.antialias,
            alpha: this.config.renderer.alpha,
            powerPreference: this.config.renderer.powerPreference,
            stencil: false,
            depth: true
        });

        // Enable shadows if configured
        if (this.config.effects.shadows) {
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
        }

        // Enable tone mapping for better color reproduction
        if (this.config.renderer.toneMapping) {
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.3;  // Increased for brighter images
        }

        this.updateRendererSize();

        // Setup advanced lighting
        this.setupLighting();

        return true;
    }

    /**
     * Setup advanced lighting system
     */
    setupLighting() {
        // Ambient light for overall illumination (increased for brighter images)
        this.lights.ambient = new THREE.AmbientLight(0xffffff, 1.2);
        this.scene.add(this.lights.ambient);

        // Main directional light (like sunlight) with shadows
        this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.5);
        this.lights.directional.position.set(5, 10, 7.5);
        this.lights.directional.castShadow = this.config.effects.shadows;

        if (this.config.effects.shadows) {
            // Configure shadow properties for quality
            this.lights.directional.shadow.mapSize.width = 2048;
            this.lights.directional.shadow.mapSize.height = 2048;
            this.lights.directional.shadow.camera.near = 0.5;
            this.lights.directional.shadow.camera.far = 50;
            this.lights.directional.shadow.camera.left = -20;
            this.lights.directional.shadow.camera.right = 20;
            this.lights.directional.shadow.camera.top = 20;
            this.lights.directional.shadow.camera.bottom = -20;
            this.lights.directional.shadow.bias = -0.0001;
            this.lights.directional.shadow.radius = 2; // Soft shadow blur
        }

        this.scene.add(this.lights.directional);

        // Subtle fill light from opposite direction (increased)
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-5, -5, 5);
        this.scene.add(fillLight);

        // Add subtle rim light for depth (increased)
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
        rimLight.position.set(0, 0, -10);
        this.scene.add(rimLight);

        console.log('✨ Advanced lighting setup complete');
    }

    /**
     * Update renderer size with proper device pixel ratio handling
     */
    updateRendererSize() {
        const dpr = this.config.renderer.maxPixelRatio;

        // Get integer pixel dimensions for pixel-perfect rendering
        const width = Math.floor(window.innerWidth);
        const height = Math.floor(window.innerHeight);

        // Set CSS size (pixel-perfect integers)
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        // Set buffer size with device pixel ratio
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(dpr);

        this.needsRender = true;
    }

    /**
     * Create masonry grid layout with responsive columns
     */
    async createMasonryGrid() {
        const columns = this.currentColumns;
        const { columnWidth, horizontalGap, verticalGap, maxFloatAmplitude } = this.config.layout;
        const columnSpacing = columnWidth + horizontalGap;

        // Load images from gallery-images.json with retry logic
        const galleryImages = await this.loadGalleryData();
        if (!galleryImages || galleryImages.length === 0) {
            throw new Error('No gallery images loaded');
        }

        // Track column heights for masonry layout
        const columnHeights = new Array(columns).fill(0);

        // Set total images to track loading progress
        this.totalImagesToLoad = galleryImages.length;
        this.imagesLoaded = 0;

        galleryImages.forEach((imageData, index) => {
            // Find shortest column
            const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));

            const aspectRatio = this.aspectRatios[index % this.aspectRatios.length];
            const imageHeight = columnWidth * aspectRatio;

            // Calculate position (centered on column) - rounded for pixel-perfect alignment
            const x = Math.round((columnIndex - columns / 2 + 0.5) * columnSpacing * 100) / 100;
            const y = Math.round(-(columnHeights[columnIndex] + imageHeight / 2) * 100) / 100;

            // Create LOD URLs
            const baseUrl = imageData.imageUrl;
            const urls = {
                low: baseUrl.replace('w=1200', `w=${this.config.lod.low.width}`).replace('q=90', 'q=80'),
                medium: baseUrl.replace('w=1200', `w=${this.config.lod.medium.width}`).replace('q=90', 'q=85'),
                high: baseUrl // Use full quality
            };

            this.createImagePlane(urls, columnWidth, imageHeight, x, y, index, imageData);

            // Update column height with safety margin for floating animation
            columnHeights[columnIndex] += imageHeight + verticalGap + (maxFloatAmplitude * 2);
        });

        // Calculate grid center and set initial camera position
        const maxHeight = Math.max(...columnHeights);
        this.gridCenterY = -maxHeight / 3;
        this.cameraTarget.y = this.gridCenterY;
        this.cameraPosition.y = this.gridCenterY;

        console.log(`📸 Created ${galleryImages.length} images in ${columns} columns`);
        console.log(`📍 Grid center: (0, ${this.gridCenterY.toFixed(2)}), Max height: ${maxHeight.toFixed(2)}`);
    }

    /**
     * Load gallery data from JSON with retry logic and validation
     */
    async loadGalleryData() {
        const { maxRetries, timeout, retryDelay } = this.config.network;
        let lastError = null;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const response = await fetch('gallery-images.json', {
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                this.validateGalleryData(data);

                console.log(`✅ Loaded ${data.length} images from gallery-images.json`);
                return data;

            } catch (error) {
                lastError = error;
                console.warn(`⚠️ Attempt ${attempt}/${maxRetries} failed:`, error.message);

                if (attempt < maxRetries) {
                    await this.delay(retryDelay * attempt); // Exponential backoff
                }
            }
        }

        console.error('❌ Failed to load gallery after', maxRetries, 'attempts:', lastError);
        throw lastError;
    }

    /**
     * Validate gallery data structure
     */
    validateGalleryData(data) {
        if (!Array.isArray(data)) {
            throw new Error('Gallery data must be an array');
        }

        data.forEach((item, index) => {
            if (!item.imageUrl || typeof item.imageUrl !== 'string') {
                throw new Error(`Invalid or missing imageUrl at index ${index}`);
            }
        });
    }

    /**
     * Utility: Delay promise
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Create image plane with loading spinner and premium materials
     */
    createImagePlane(urls, width, height, x, y, index, imageData = null) {
        const geometry = new THREE.PlaneGeometry(width, height);

        // Create premium material with lighting response (optimized for brightness)
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            roughness: 0.3,  // Reduced for more light reflection
            metalness: 0.0,  // Reduced for brighter appearance
            emissive: 0x000000,
            emissiveIntensity: 0
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Enable shadow casting and receiving
        if (this.config.effects.shadows) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }

        // Slide-in direction for intro animation
        const directions = ['left', 'right', 'top', 'bottom'];
        const direction = directions[index % directions.length];

        let startX = x;
        let startY = y;

        switch(direction) {
            case 'left': startX = -25; break;
            case 'right': startX = 25; break;
            case 'top': startY = 20; break;
            case 'bottom': startY = -20; break;
        }

        // Enhanced user data with LOD tracking and crossfade support
        mesh.userData = {
            targetX: x,
            targetY: y,
            startX: startX,
            startY: startY,
            originalX: x,
            originalY: y,
            urls: urls,
            currentLOD: null,
            targetLOD: 'medium',  // Start with medium quality for better initial look
            loadedTextures: {},
            animationDelay: index * 0.02,
            lodTransitionProgress: 1,
            previousTexture: null,
            crossfadeProgress: 1,
            // Image metadata
            title: imageData?.title || '',
            alt: imageData?.alt || '',
            isLoaded: false,
            // Hover state - 3D rotation
            hoverProgress: 0,
            targetHoverProgress: 0,
            rotationX: 0,
            rotationY: 0,
            targetRotationX: 0,
            targetRotationY: 0,
            // Frustum culling
            isVisible: true,
            lastVisibilityCheck: 0
        };

        mesh.position.set(startX, startY, 0);

        this.scene.add(mesh);
        this.images.push(mesh);

        // Create loading spinner
        this.createLoadingSpinner(x, y, mesh);

        // Start loading medium-res texture for better quality
        this.loadTexture(mesh, 'medium');
    }

    /**
     * Create loading spinner for image
     */
    createLoadingSpinner(x, y, targetMesh) {
        const spinnerGeometry = new THREE.RingGeometry(0.15, 0.18, 32);
        const spinnerMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const spinner = new THREE.Mesh(spinnerGeometry, spinnerMaterial);
        spinner.position.set(x, y, 0.1);

        spinner.userData.targetMesh = targetMesh;
        spinner.userData.rotationSpeed = 0.05;

        this.scene.add(spinner);
        this.loadingSpinners.push(spinner);
    }

    /**
     * Load texture for specific LOD level with crossfade support
     */
    loadTexture(mesh, lodLevel) {
        const userData = mesh.userData;
        const url = userData.urls[lodLevel];

        // Already loaded
        if (userData.loadedTextures[lodLevel]) {
            if (userData.currentLOD !== lodLevel) {
                userData.previousTexture = mesh.material.map;
                userData.crossfadeProgress = 0;
            }

            mesh.material.map = userData.loadedTextures[lodLevel];
            mesh.material.needsUpdate = true;
            userData.currentLOD = lodLevel;
            return;
        }

        // Load new texture
        this.textureLoader.load(
            url,
            (texture) => {
                // Store texture
                userData.loadedTextures[lodLevel] = texture;

                // Apply if this is still the desired LOD
                if (userData.targetLOD === lodLevel) {
                    userData.previousTexture = mesh.material.map;
                    userData.crossfadeProgress = 0;

                    mesh.material.map = texture;
                    mesh.material.color.set(0xffffff);
                    mesh.material.needsUpdate = true;
                    userData.currentLOD = lodLevel;
                    userData.isLoaded = true;

                    this.needsRender = true;

                    // Update loading progress
                    this.updateLoadingProgress();

                    console.log(`✅ Loaded ${lodLevel} for image (zoom: ${this.zoom.toFixed(2)})`);
                }
            },
            undefined,
            (error) => {
                console.warn(`❌ Failed to load image (${lodLevel}): ${url}`, error);
                userData.isLoaded = true; // Mark as loaded to remove spinner
                this.updateLoadingProgress();
            }
        );
    }

    /**
     * Update loading progress UI
     */
    updateLoadingProgress() {
        this.imagesLoaded++;
        const progress = (this.imagesLoaded / this.totalImagesToLoad) * 100;

        if (this.loadingProgressBar) {
            this.loadingProgressBar.style.width = `${progress}%`;
        }

        if (this.loadingPercent) {
            this.loadingPercent.textContent = `${Math.round(progress)}%`;
        }

        // Hide loading screen when all images are loaded
        if (this.imagesLoaded >= this.totalImagesToLoad && this.loadingScreen) {
            setTimeout(() => {
                this.loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                }, 500);
            }, 300);

            console.log('🎨 All images loaded - Gallery ready!');
        }
    }

    /**
     * Update LOD based on current zoom level
     */
    updateTextureLOD() {
        // Determine target LOD based on zoom level
        let targetLOD = 'low';

        if (this.zoom > this.config.lod.high.min) {
            targetLOD = 'high';
        } else if (this.zoom > this.config.lod.medium.min) {
            targetLOD = 'medium';
        }

        // Update all images
        this.images.forEach(mesh => {
            const userData = mesh.userData;

            // Only update if LOD needs to change
            if (userData.targetLOD !== targetLOD) {
                userData.targetLOD = targetLOD;

                // Dispose old texture to free memory
                const oldLOD = userData.currentLOD;
                if (oldLOD && oldLOD !== targetLOD && userData.loadedTextures[oldLOD]) {
                    userData.loadedTextures[oldLOD].dispose();
                    delete userData.loadedTextures[oldLOD];
                }

                // Load the new LOD level
                if (!userData.loadedTextures[targetLOD]) {
                    this.loadTexture(mesh, targetLOD);
                } else {
                    // Already loaded, just switch
                    userData.previousTexture = mesh.material.map;
                    userData.lodTransitionProgress = 0;
                    mesh.material.map = userData.loadedTextures[targetLOD];
                    mesh.material.needsUpdate = true;
                    userData.currentLOD = targetLOD;
                }
            }
        });
    }

    /**
     * Add all event listeners
     */
    addEventListeners() {
        // Mouse down
        this.boundHandlers.mousedown = (e) => {
            this.isDragging = true;
            this.previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
            this.canvas.style.cursor = 'grabbing';
        };
        this.canvas.addEventListener('mousedown', this.boundHandlers.mousedown);

        // Mouse move
        this.boundHandlers.mousemove = (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.previousMousePosition.x;
                const deltaY = e.clientY - this.previousMousePosition.y;

                const panSpeed = 0.01 / this.zoom;
                const adjustedDeltaX = deltaX * panSpeed;
                const adjustedDeltaY = deltaY * panSpeed;

                this.cameraTarget.x -= adjustedDeltaX;
                this.cameraTarget.y += adjustedDeltaY;

                // Track velocity for momentum (store recent deltas)
                this.dragHistory.push({
                    deltaX: adjustedDeltaX,
                    deltaY: adjustedDeltaY,
                    time: performance.now()
                });

                // Keep only last 5 drag events
                if (this.dragHistory.length > 5) {
                    this.dragHistory.shift();
                }

                // Apply boundary constraints
                this.cameraTarget.x = Math.max(-this.config.camera.boundaryX,
                    Math.min(this.config.camera.boundaryX, this.cameraTarget.x));
                this.cameraTarget.y = Math.max(-this.config.camera.boundaryY,
                    Math.min(this.config.camera.boundaryY, this.cameraTarget.y));

                this.previousMousePosition = {
                    x: e.clientX,
                    y: e.clientY
                };

                this.needsRender = true;
            } else {
                // Check for hover when not dragging
                this.updateHover(e);
            }

            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        this.canvas.addEventListener('mousemove', this.boundHandlers.mousemove);

        // Mouse up - apply momentum
        this.boundHandlers.mouseup = () => {
            if (this.isDragging && this.config.animation.inertiaEnabled) {
                // Calculate average velocity from recent drag history
                if (this.dragHistory.length > 0) {
                    const now = performance.now();
                    const recentDrags = this.dragHistory.filter(drag => now - drag.time < 100);

                    if (recentDrags.length > 0) {
                        const avgDeltaX = recentDrags.reduce((sum, drag) => sum + drag.deltaX, 0) / recentDrags.length;
                        const avgDeltaY = recentDrags.reduce((sum, drag) => sum + drag.deltaY, 0) / recentDrags.length;

                        // Apply velocity with multiplier
                        this.velocity.x = -avgDeltaX * this.config.animation.velocityMultiplier * 15;
                        this.velocity.y = avgDeltaY * this.config.animation.velocityMultiplier * 15;
                    }
                }

                this.dragHistory = [];
            }

            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        };
        window.addEventListener('mouseup', this.boundHandlers.mouseup);

        // Double-click to zoom
        this.boundHandlers.dblclick = (e) => {
            const zoomIn = this.targetZoom < this.config.camera.maxZoom * 0.7;
            const targetZoomLevel = zoomIn ? this.config.camera.maxZoom * 0.8 : this.config.camera.initialZoom;

            // Get mouse position in world coordinates
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            // Calculate zoom center point (zoom toward cursor)
            const aspect = window.innerWidth / window.innerHeight;
            const frustumSize = this.config.camera.frustumSize / this.zoom;
            const worldX = this.cameraPosition.x + mouseX * frustumSize * aspect / 2;
            const worldY = this.cameraPosition.y + mouseY * frustumSize / 2;

            // Adjust camera target to zoom toward cursor
            const zoomRatio = targetZoomLevel / this.zoom;
            this.cameraTarget.x = worldX - (worldX - this.cameraPosition.x) / zoomRatio;
            this.cameraTarget.y = worldY - (worldY - this.cameraPosition.y) / zoomRatio;

            // Apply boundary constraints
            this.cameraTarget.x = Math.max(-this.config.camera.boundaryX,
                Math.min(this.config.camera.boundaryX, this.cameraTarget.x));
            this.cameraTarget.y = Math.max(-this.config.camera.boundaryY,
                Math.min(this.config.camera.boundaryY, this.cameraTarget.y));

            this.targetZoom = targetZoomLevel;
            this.needsRender = true;
        };
        this.canvas.addEventListener('dblclick', this.boundHandlers.dblclick);

        // Wheel zoom - zoom toward cursor
        this.boundHandlers.wheel = (e) => {
            e.preventDefault();

            const zoomSpeed = 0.001;
            const delta = e.deltaY;

            // Get mouse position in normalized device coordinates
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            // Calculate world position at cursor before zoom
            const aspect = window.innerWidth / window.innerHeight;
            const frustumSize = this.config.camera.frustumSize / this.zoom;
            const worldX = this.cameraPosition.x + mouseX * frustumSize * aspect / 2;
            const worldY = this.cameraPosition.y + mouseY * frustumSize / 2;

            // Update zoom
            const previousZoom = this.targetZoom;
            this.targetZoom *= (1 - delta * zoomSpeed);
            this.targetZoom = Math.max(this.config.camera.minZoom,
                Math.min(this.config.camera.maxZoom, this.targetZoom));

            // Adjust camera to zoom toward cursor
            if (this.targetZoom !== previousZoom) {
                const zoomRatio = this.targetZoom / this.zoom;
                this.cameraTarget.x = worldX - (worldX - this.cameraTarget.x) / zoomRatio;
                this.cameraTarget.y = worldY - (worldY - this.cameraTarget.y) / zoomRatio;

                // Apply boundary constraints
                this.cameraTarget.x = Math.max(-this.config.camera.boundaryX,
                    Math.min(this.config.camera.boundaryX, this.cameraTarget.x));
                this.cameraTarget.y = Math.max(-this.config.camera.boundaryY,
                    Math.min(this.config.camera.boundaryY, this.cameraTarget.y));
            }

            this.needsRender = true;
        };
        this.canvas.addEventListener('wheel', this.boundHandlers.wheel, { passive: false });

        // Window resize
        this.boundHandlers.resize = () => {
            const aspect = window.innerWidth / window.innerHeight;
            const frustumSize = this.config.camera.frustumSize;

            this.camera.left = frustumSize * aspect / -2;
            this.camera.right = frustumSize * aspect / 2;
            this.camera.top = frustumSize / 2;
            this.camera.bottom = frustumSize / -2;
            this.camera.updateProjectionMatrix();

            this.updateRendererSize();

            // Check if columns need to change
            const newColumns = this.calculateColumns();
            if (newColumns !== this.currentColumns) {
                console.log(`📱 Columns changed: ${this.currentColumns} → ${newColumns}`);
                // Note: Full re-layout would require regenerating the grid
                // For now, just update the count
                this.currentColumns = newColumns;
            }

            this.needsRender = true;
        };
        window.addEventListener('resize', this.boundHandlers.resize);

        // Touch support
        let lastTouchDistance = 0;

        this.boundHandlers.touchstart = (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.previousMousePosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            } else if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                lastTouchDistance = Math.sqrt(dx * dx + dy * dy);
            }
        };
        this.canvas.addEventListener('touchstart', this.boundHandlers.touchstart);

        this.boundHandlers.touchmove = (e) => {
            e.preventDefault();

            if (this.isDragging && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
                const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

                // Faster pan speed for mobile
                const panSpeed = 0.015 / this.zoom;
                this.cameraTarget.x -= deltaX * panSpeed;
                this.cameraTarget.y += deltaY * panSpeed;

                // Apply boundary constraints
                this.cameraTarget.x = Math.max(-this.config.camera.boundaryX,
                    Math.min(this.config.camera.boundaryX, this.cameraTarget.x));
                this.cameraTarget.y = Math.max(-this.config.camera.boundaryY,
                    Math.min(this.config.camera.boundaryY, this.cameraTarget.y));

                this.previousMousePosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };

                this.needsRender = true;
            } else if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (lastTouchDistance > 0) {
                    const delta = distance - lastTouchDistance;
                    this.targetZoom *= (1 + delta * 0.01);
                    this.targetZoom = Math.max(this.config.camera.minZoom,
                        Math.min(this.config.camera.maxZoom, this.targetZoom));

                    this.needsRender = true;
                }

                lastTouchDistance = distance;
            }
        };
        this.canvas.addEventListener('touchmove', this.boundHandlers.touchmove, { passive: false });

        this.boundHandlers.touchend = () => {
            this.isDragging = false;
            lastTouchDistance = 0;
        };
        this.canvas.addEventListener('touchend', this.boundHandlers.touchend);

        this.canvas.style.cursor = 'grab';
    }

    /**
     * Update hover state - detect which image is under cursor with 3D rotation
     */
    updateHover(e) {
        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Check intersections
        const intersects = this.raycaster.intersectObjects(this.images);

        if (intersects.length > 0) {
            const hoveredMesh = intersects[0].object;
            const intersection = intersects[0];

            if (this.hoveredImage !== hoveredMesh) {
                // Clear previous hover
                if (this.hoveredImage) {
                    this.hoveredImage.userData.targetHoverProgress = 0;
                    this.hoveredImage.userData.targetRotationX = 0;
                    this.hoveredImage.userData.targetRotationY = 0;
                }

                // Set new hover
                this.hoveredImage = hoveredMesh;
                this.hoveredImage.userData.targetHoverProgress = 1;
                this.canvas.style.cursor = 'pointer';
                this.needsRender = true;
            }

            // Calculate 3D tilt based on mouse position relative to image center
            if (this.hoveredImage && intersection.uv) {
                // UV coordinates are 0-1, convert to -1 to 1 for rotation
                const centerU = intersection.uv.x - 0.5;
                const centerV = intersection.uv.y - 0.5;

                // Tilt strength (in radians)
                const tiltStrength = 0.15;

                // Calculate target rotation (opposite to mouse position for parallax effect)
                this.hoveredImage.userData.targetRotationX = -centerV * tiltStrength;
                this.hoveredImage.userData.targetRotationY = centerU * tiltStrength;
            }
        } else if (this.hoveredImage) {
            // Clear hover
            this.hoveredImage.userData.targetHoverProgress = 0;
            this.hoveredImage.userData.targetRotationX = 0;
            this.hoveredImage.userData.targetRotationY = 0;
            this.hoveredImage = null;
            this.canvas.style.cursor = 'grab';
            this.needsRender = true;
        }
    }

    /**
     * Check if image is within viewport (frustum culling)
     */
    isImageVisible(mesh) {
        const userData = mesh.userData;
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = this.config.camera.frustumSize / this.zoom;

        // Calculate viewport bounds in world coordinates
        const viewLeft = this.cameraPosition.x - frustumSize * aspect / 2;
        const viewRight = this.cameraPosition.x + frustumSize * aspect / 2;
        const viewTop = this.cameraPosition.y + frustumSize / 2;
        const viewBottom = this.cameraPosition.y - frustumSize / 2;

        // Get image bounds
        const geometry = mesh.geometry;
        const width = geometry.parameters.width;
        const height = geometry.parameters.height;

        const imgLeft = mesh.position.x - width / 2;
        const imgRight = mesh.position.x + width / 2;
        const imgTop = mesh.position.y + height / 2;
        const imgBottom = mesh.position.y - height / 2;

        // Check if image intersects with viewport (with buffer for preloading)
        const buffer = 2;
        return !(imgRight < viewLeft - buffer ||
                 imgLeft > viewRight + buffer ||
                 imgBottom > viewTop + buffer ||
                 imgTop < viewBottom - buffer);
    }

    /**
     * Update frustum culling and visibility
     */
    updateVisibility() {
        this.images.forEach(mesh => {
            mesh.userData.isVisible = this.isImageVisible(mesh);
        });
    }

    /**
     * Main animation loop with render-on-demand
     */
    animate(timestamp = 0) {
        this.animationId = requestAnimationFrame((ts) => this.animate(ts));

        // Calculate delta time (frame-independent animations)
        const deltaTime = this.lastTimestamp ? timestamp - this.lastTimestamp : 16;
        this.lastTimestamp = timestamp;
        const deltaSeconds = deltaTime * 0.001;

        this.time += deltaSeconds;

        // Apply momentum/inertia to camera
        if (!this.isDragging && this.config.animation.inertiaEnabled) {
            const hasVelocity = Math.abs(this.velocity.x) > 0.0001 || Math.abs(this.velocity.y) > 0.0001;

            if (hasVelocity) {
                this.cameraTarget.x += this.velocity.x * deltaSeconds;
                this.cameraTarget.y += this.velocity.y * deltaSeconds;

                // Apply boundary constraints
                this.cameraTarget.x = Math.max(-this.config.camera.boundaryX,
                    Math.min(this.config.camera.boundaryX, this.cameraTarget.x));
                this.cameraTarget.y = Math.max(-this.config.camera.boundaryY,
                    Math.min(this.config.camera.boundaryY, this.cameraTarget.y));

                // Apply friction
                this.velocity.x *= this.config.animation.friction;
                this.velocity.y *= this.config.animation.friction;

                this.needsRender = true;
            }
        }

        // Check if we need to render
        const hasActiveIntro = this.introAnimationProgress < 1;
        const hasActiveFloating = this.config.animation.floatingEnabled;
        const hasCameraMovement = Math.abs(this.cameraPosition.x - this.cameraTarget.x) > 0.001 ||
                                  Math.abs(this.cameraPosition.y - this.cameraTarget.y) > 0.001;
        const hasZoomChange = Math.abs(this.zoom - this.targetZoom) > 0.001;
        const hasVelocity = Math.abs(this.velocity.x) > 0.0001 || Math.abs(this.velocity.y) > 0.0001;

        // Skip render if nothing is animating and no user interaction
        if (!this.needsRender && !hasActiveIntro && !hasCameraMovement && !hasZoomChange && !hasActiveFloating && !hasVelocity) {
            return;
        }

        // Update intro animation
        if (hasActiveIntro) {
            this.introAnimationProgress += deltaSeconds / this.config.animation.introSpeed;
            this.introAnimationProgress = Math.min(1, this.introAnimationProgress);
        }

        // Smooth camera movement
        const damping = this.config.animation.damping;
        this.cameraPosition.x += (this.cameraTarget.x - this.cameraPosition.x) * damping;
        this.cameraPosition.y += (this.cameraTarget.y - this.cameraPosition.y) * damping;

        // Apply gallery-wide floating animation (entire gallery moves together)
        let galleryOffsetX = 0;
        let galleryOffsetY = 0;
        let galleryOffsetZ = 0;

        if (this.config.animation.floatingEnabled && this.introAnimationProgress >= 1) {
            const { galleryFloatAmplitudeX, galleryFloatAmplitudeY, galleryFloatSpeedX, galleryFloatSpeedY } = this.config.animation;
            galleryOffsetX = Math.sin(this.time * galleryFloatSpeedX + this.galleryFloatPhaseX) * galleryFloatAmplitudeX;
            galleryOffsetY = Math.cos(this.time * galleryFloatSpeedY + this.galleryFloatPhaseY) * galleryFloatAmplitudeY;

            // Add subtle Z-axis movement for depth
            galleryOffsetZ = Math.sin(this.time * galleryFloatSpeedX * 0.5) * 0.02;
        }

        // Apply camera position with gallery-wide floating offset
        // NO rounding here - smooth sub-pixel animation is important for fluidity
        this.camera.position.x = this.cameraPosition.x + galleryOffsetX;
        this.camera.position.y = this.cameraPosition.y + galleryOffsetY;
        this.camera.position.z = 10 + galleryOffsetZ;

        // Smooth zoom
        const previousZoom = this.zoom;
        this.zoom += (this.targetZoom - this.zoom) * damping;

        // Update LOD when zoom changes significantly
        if (Math.abs(this.zoom - previousZoom) > 0.02) {
            this.updateTextureLOD();
        }

        // Update visibility (frustum culling) every 100ms for performance
        if (this.time % 0.1 < deltaSeconds) {
            this.updateVisibility();
        }

        // Update camera projection based on zoom
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = this.config.camera.frustumSize / this.zoom;
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();

        // Animate images (intro + floating + hover + LOD crossfade)
        this.images.forEach(mesh => {
            const userData = mesh.userData;

            // Only process visible images for performance (intro animation always runs)
            if (!userData.isVisible && this.introAnimationProgress >= 1) {
                return;
            }

            // Intro slide-in animation
            const delayedProgress = Math.max(0, Math.min(1,
                (this.introAnimationProgress - userData.animationDelay / this.config.animation.introSpeed) * 1.5
            ));

            const eased = 1 - Math.pow(1 - delayedProgress, 3); // Cubic ease-out

            if (delayedProgress < 1) {
                // Slide-in animation - smooth sub-pixel movement
                const currentX = userData.startX + (userData.targetX - userData.startX) * eased;
                const currentY = userData.startY + (userData.targetY - userData.startY) * eased;

                mesh.position.x = currentX;
                mesh.position.y = currentY;
                mesh.material.opacity = eased;
            } else {
                // Static position - gallery-wide floating is applied to camera instead
                mesh.position.x = userData.targetX;
                mesh.position.y = userData.targetY;
                mesh.material.opacity = 1;
            }

            // Hover effect - smooth scale and 3D rotation
            userData.hoverProgress += (userData.targetHoverProgress - userData.hoverProgress) * this.config.animation.hoverSpeed;

            // Smooth rotation interpolation
            userData.rotationX += (userData.targetRotationX - userData.rotationX) * 0.1;
            userData.rotationY += (userData.targetRotationY - userData.rotationY) * 0.1;

            if (userData.hoverProgress > 0.001) {
                const hoverScale = 1 + (this.config.animation.hoverScale - 1) * userData.hoverProgress;
                mesh.scale.set(hoverScale, hoverScale, 1);
                mesh.position.z = userData.hoverProgress * 0.3; // More pronounced lift effect

                // Apply 3D rotation for tilt effect
                mesh.rotation.x = userData.rotationX;
                mesh.rotation.y = userData.rotationY;

                // Add subtle glow effect on hover
                if (mesh.material.emissiveIntensity !== undefined) {
                    mesh.material.emissiveIntensity = userData.hoverProgress * 0.1;
                }
            } else {
                mesh.scale.set(1, 1, 1);
                mesh.position.z = 0;
                mesh.rotation.x = 0;
                mesh.rotation.y = 0;

                if (mesh.material.emissiveIntensity !== undefined) {
                    mesh.material.emissiveIntensity = 0;
                }
            }

            // Smooth LOD crossfade transition
            if (userData.crossfadeProgress < 1) {
                userData.crossfadeProgress += this.config.animation.lodCrossfadeSpeed;
                userData.crossfadeProgress = Math.min(1, userData.crossfadeProgress);

                // Fade in the new texture
                const fadeProgress = userData.crossfadeProgress;
                mesh.material.opacity = delayedProgress >= 1 ? fadeProgress : eased * fadeProgress;
            }
        });

        // Animate and clean up loading spinners
        this.loadingSpinners = this.loadingSpinners.filter(spinner => {
            const targetMesh = spinner.userData.targetMesh;

            if (targetMesh.userData.isLoaded) {
                // Remove spinner
                this.scene.remove(spinner);
                spinner.geometry.dispose();
                spinner.material.dispose();
                return false;
            } else {
                // Rotate spinner
                spinner.rotation.z += spinner.userData.rotationSpeed;
                return true;
            }
        });

        // Render the scene
        this.renderer.render(this.scene, this.camera);

        // Reset needsRender flag
        this.needsRender = false;
    }

    /**
     * Show error message on canvas
     */
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'absolute';
        errorDiv.style.top = '50%';
        errorDiv.style.left = '50%';
        errorDiv.style.transform = 'translate(-50%, -50%)';
        errorDiv.style.padding = '20px 40px';
        errorDiv.style.background = 'rgba(0, 0, 0, 0.8)';
        errorDiv.style.color = '#fff';
        errorDiv.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.zIndex = '1000';
        errorDiv.textContent = message;

        this.canvas.parentElement.appendChild(errorDiv);
    }

    /**
     * Clean up resources and remove event listeners
     * Call this when destroying the gallery
     */
    destroy() {
        console.log('🧹 Cleaning up gallery resources...');

        // Cancel animation frame
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Remove event listeners
        if (this.boundHandlers.mousedown) {
            this.canvas.removeEventListener('mousedown', this.boundHandlers.mousedown);
        }
        if (this.boundHandlers.mousemove) {
            this.canvas.removeEventListener('mousemove', this.boundHandlers.mousemove);
        }
        if (this.boundHandlers.mouseup) {
            window.removeEventListener('mouseup', this.boundHandlers.mouseup);
        }
        if (this.boundHandlers.dblclick) {
            this.canvas.removeEventListener('dblclick', this.boundHandlers.dblclick);
        }
        if (this.boundHandlers.wheel) {
            this.canvas.removeEventListener('wheel', this.boundHandlers.wheel);
        }
        if (this.boundHandlers.resize) {
            window.removeEventListener('resize', this.boundHandlers.resize);
        }
        if (this.boundHandlers.touchstart) {
            this.canvas.removeEventListener('touchstart', this.boundHandlers.touchstart);
        }
        if (this.boundHandlers.touchmove) {
            this.canvas.removeEventListener('touchmove', this.boundHandlers.touchmove);
        }
        if (this.boundHandlers.touchend) {
            this.canvas.removeEventListener('touchend', this.boundHandlers.touchend);
        }

        // Dispose loading spinners
        this.loadingSpinners.forEach(spinner => {
            this.scene.remove(spinner);
            spinner.geometry.dispose();
            spinner.material.dispose();
        });
        this.loadingSpinners = [];

        // Dispose all Three.js resources
        this.images.forEach(mesh => {
            // Dispose geometries
            if (mesh.geometry) {
                mesh.geometry.dispose();
            }

            // Dispose materials
            if (mesh.material) {
                mesh.material.dispose();
            }

            // Dispose all loaded textures
            if (mesh.userData.loadedTextures) {
                Object.values(mesh.userData.loadedTextures).forEach(texture => {
                    if (texture && texture.dispose) {
                        texture.dispose();
                    }
                });
            }

            // Remove from scene
            this.scene.remove(mesh);
        });
        this.images = [];

        // Dispose renderer
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            this.renderer = null;
        }

        console.log('✅ Gallery cleanup complete');
    }
}

// Initialize gallery
const gallery = new CanvasGallery();

// Expose gallery instance and methods globally
window.gallery = gallery;
window.galleryCleanup = () => gallery.destroy();
