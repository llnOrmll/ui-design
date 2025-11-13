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
        galleryFloatSpeedY: 0.25
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

    // LOD (Level of Detail) thresholds
    lod: {
        low: { min: 0, max: 1.3, width: 400 },
        medium: { min: 1.0, max: 2.2, width: 800 },
        high: { min: 1.8, max: Infinity, width: 1200 }
    },

    // Renderer settings
    renderer: {
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        maxPixelRatio: 2
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

        // Camera controls state
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.cameraTarget = { x: 0, y: 0 };
        this.cameraPosition = { x: 0, y: 0 };
        this.zoom = this.config.camera.initialZoom;
        this.targetZoom = this.config.camera.initialZoom;

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

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);

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

        // Renderer with optimized settings
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: this.config.renderer.antialias,
            alpha: this.config.renderer.alpha,
            powerPreference: this.config.renderer.powerPreference
        });

        this.updateRendererSize();

        return true;
    }

    /**
     * Update renderer size with proper device pixel ratio handling
     */
    updateRendererSize() {
        const dpr = Math.min(window.devicePixelRatio, this.config.renderer.maxPixelRatio);

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
     * Create image plane with loading spinner
     */
    createImagePlane(urls, width, height, x, y, index, imageData = null) {
        const geometry = new THREE.PlaneGeometry(width, height);

        // Create material with fade support
        const material = new THREE.MeshBasicMaterial({
            color: 0xdddddd,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0
        });

        const mesh = new THREE.Mesh(geometry, material);

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

        // Enhanced user data with LOD tracking
        mesh.userData = {
            targetX: x,
            targetY: y,
            startX: startX,
            startY: startY,
            originalX: x,
            originalY: y,
            urls: urls,
            currentLOD: 'low',
            targetLOD: 'low',
            loadedTextures: {},
            animationDelay: index * 0.02,
            lodTransitionProgress: 1,
            previousTexture: null,
            // Image metadata
            title: imageData?.title || '',
            alt: imageData?.alt || '',
            isLoaded: false
        };

        mesh.position.set(startX, startY, 0);

        this.scene.add(mesh);
        this.images.push(mesh);

        // Create loading spinner
        this.createLoadingSpinner(x, y, mesh);

        // Start loading low-res texture
        this.loadTexture(mesh, 'low');
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
     * Load texture for specific LOD level
     */
    loadTexture(mesh, lodLevel) {
        const userData = mesh.userData;
        const url = userData.urls[lodLevel];

        // Already loaded
        if (userData.loadedTextures[lodLevel]) {
            if (userData.currentLOD !== lodLevel) {
                userData.previousTexture = mesh.material.map;
                userData.lodTransitionProgress = 0;
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
                    userData.lodTransitionProgress = 0;

                    mesh.material.map = texture;
                    mesh.material.color.set(0xffffff);
                    mesh.material.needsUpdate = true;
                    userData.currentLOD = lodLevel;
                    userData.isLoaded = true;

                    this.needsRender = true;

                    console.log(`✅ Loaded ${lodLevel} for image (zoom: ${this.zoom.toFixed(2)})`);
                }
            },
            undefined,
            (error) => {
                console.warn(`❌ Failed to load image (${lodLevel}): ${url}`, error);
                userData.isLoaded = true; // Mark as loaded to remove spinner
            }
        );
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
                this.cameraTarget.x -= deltaX * panSpeed;
                this.cameraTarget.y += deltaY * panSpeed;

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
            }

            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        this.canvas.addEventListener('mousemove', this.boundHandlers.mousemove);

        // Mouse up
        this.boundHandlers.mouseup = () => {
            this.isDragging = false;
            this.canvas.style.cursor = 'grab';
        };
        window.addEventListener('mouseup', this.boundHandlers.mouseup);

        // Wheel zoom
        this.boundHandlers.wheel = (e) => {
            e.preventDefault();

            const zoomSpeed = 0.001;
            const delta = e.deltaY;

            this.targetZoom *= (1 - delta * zoomSpeed);
            this.targetZoom = Math.max(this.config.camera.minZoom,
                Math.min(this.config.camera.maxZoom, this.targetZoom));

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
     * Main animation loop with render-on-demand
     */
    animate(timestamp = 0) {
        this.animationId = requestAnimationFrame((ts) => this.animate(ts));

        // Calculate delta time (frame-independent animations)
        const deltaTime = this.lastTimestamp ? timestamp - this.lastTimestamp : 16;
        this.lastTimestamp = timestamp;
        const deltaSeconds = deltaTime * 0.001;

        this.time += deltaSeconds;

        // Check if we need to render
        const hasActiveIntro = this.introAnimationProgress < 1;
        const hasActiveFloating = this.config.animation.floatingEnabled;
        const hasCameraMovement = Math.abs(this.cameraPosition.x - this.cameraTarget.x) > 0.001 ||
                                  Math.abs(this.cameraPosition.y - this.cameraTarget.y) > 0.001;
        const hasZoomChange = Math.abs(this.zoom - this.targetZoom) > 0.001;

        // Skip render if nothing is animating and no user interaction
        if (!this.needsRender && !hasActiveIntro && !hasCameraMovement && !hasZoomChange && !hasActiveFloating) {
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

        if (this.config.animation.floatingEnabled && this.introAnimationProgress >= 1) {
            const { galleryFloatAmplitudeX, galleryFloatAmplitudeY, galleryFloatSpeedX, galleryFloatSpeedY } = this.config.animation;
            galleryOffsetX = Math.sin(this.time * galleryFloatSpeedX + this.galleryFloatPhaseX) * galleryFloatAmplitudeX;
            galleryOffsetY = Math.cos(this.time * galleryFloatSpeedY + this.galleryFloatPhaseY) * galleryFloatAmplitudeY;
        }

        // Apply camera position with gallery-wide floating offset
        // NO rounding here - smooth sub-pixel animation is important for fluidity
        this.camera.position.x = this.cameraPosition.x + galleryOffsetX;
        this.camera.position.y = this.cameraPosition.y + galleryOffsetY;

        // Smooth zoom
        const previousZoom = this.zoom;
        this.zoom += (this.targetZoom - this.zoom) * damping;

        // Update LOD when zoom changes significantly
        if (Math.abs(this.zoom - previousZoom) > 0.02) {
            this.updateTextureLOD();
        }

        // Update camera projection based on zoom
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = this.config.camera.frustumSize / this.zoom;
        this.camera.left = frustumSize * aspect / -2;
        this.camera.right = frustumSize * aspect / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = frustumSize / -2;
        this.camera.updateProjectionMatrix();

        // Animate images (intro + floating)
        this.images.forEach(mesh => {
            const userData = mesh.userData;

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

            // Smooth LOD transition
            if (userData.lodTransitionProgress < 1) {
                userData.lodTransitionProgress += 0.05;
                userData.lodTransitionProgress = Math.min(1, userData.lodTransitionProgress);
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

// Expose destroy method for cleanup (e.g., on page navigation)
window.galleryCleanup = () => gallery.destroy();
