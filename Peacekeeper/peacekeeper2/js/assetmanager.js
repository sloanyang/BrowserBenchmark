/**
 * Asset manager for loading images. Requires jquery.
 */
var assetManager = {

	TYPE_IMAGE: "image",
	TYPE_SOURCE: "source",

	// Function executed when all images are loaded.
	onload: false,
	
	retryLimit: 10,
	
	// Progress function.
	onprogress: false,
	
	// Associative array of assets.
	assets: new Array(),
	
	// Number of loaded assets.
	loadedAssets: 0,
	
	/**
	 * Add asset url to list.
	 */
	add: function(url, type) {
		
		// Default type is image.
		if (typeof(type) == "undefined") type = "image";
		
		// Create asset.
		var asset = new Object();
		asset.url = url;
		asset.asset = false;
		asset.type = type;
		asset.loadCount = 0;
		assetManager.assets.push(asset);
		
	},
	
	/** 
     * Starts loading of assets.
 	 */
	load: function() {
	
		// If no assets, just run onload and quit.
		if (assetManager.assets.length == 0) {
			assetManager.onload();
			return;
		}
		
		// Start loading of all elements.
		for (var i = 0; i < assetManager.assets.length; i++) {

			// Choose correct type.
			if (assetManager.assets[i].type == assetManager.TYPE_IMAGE) 
			{

				// Create image.
				var image = document.createElement("img");
				
				// Add to assets.
				assetManager.assets[i].asset = image;
				
				// Set onload method.
				image.onload = assetManager.loaded;

        // Set asset id.
        // image.assetId = i;
				
				// Set onerror method.
				image.onerror = function() {
				  assetManager.error(this);
				}
	
				// Set source.
				image.src = assetManager.assets[i].url;

			} else {
			
				// Load source code.
				var assetId = i; // If extending with multiple classes doesn't work, this might be a problem.
				$.ajax({
					url: assetManager.assets[i].url,
					dataType: "script",
					success: function(data) {
						assetManager.assets[assetId].asset = data;
						assetManager.loaded();
					}
				});
			
			}
			
		}
		
	},

	/**
	 * 
	 */
	loaded: function(e) {
		
		// Increase load counter.
		assetManager.loadedAssets++;
		
		if (assetManager.assets.length > 20) parent.logger.info("assetManager", "Assets loaded " + assetManager.loadedAssets + "/" + assetManager.assets.length);

		// Call progress event.
		if (assetManager.onprogress) {
			assetManager.onprogress(assetManager.loadedAssets / assetManager.assets.length);
		}
		
		// If ready, run onload-function.
		if (assetManager.loadedAssets == assetManager.assets.length
			&& assetManager.onload) {
			assetManager.onload();
		}
		
	},
	
	/**
	 * Asset failed to load.
	 */
	error: function(image) 
	{
	
		for (var i = 0; i < assetManager.assets.length; i++) 
		{
      if (assetManager.assets[i].asset == image)
      {
        assetManager.assets[i].loadCount++;
        if (assetManager.assets[i].loadCount < assetManager.retryLimit)
        {
          setTimeout(function() {
            assetManager.assets[i].asset.error = function() {
              assetManager.error(assetManager.assets[i].asset);
            }
            assetManager.assets[i].asset.src = image.src;
          }, 1000);
        } else {
          assetManager.onerror();
        }
        return;
      }
    }
	
	},

	/**
	 * Returns requested asset.
	 */
	get: function(url, singleInstance) {
	
		if (typeof(singleInstance) == "undefined") singleInstance = false;
	
		for (var i = 0; i < assetManager.assets.length; i++) {
			if (assetManager.assets[i].url == url) {
			
				// Return image.
				if (assetManager.assets[i].type == assetManager.TYPE_IMAGE) {
				
					if (singleInstance) {
						// Return single instance.
						return assetManager.assets[i].asset;
					} else {
						// Return clone.
						return assetManager.assets[i].asset.cloneNode(true);
					}
				} else {
				
					// Return source.
					return assetManager.assets[i].asset;
					
				}
				
			}
		}
		
	},
	
	clear: function() {
		assetManager.assets = new Array();
		assetManager.loadedAssets = 0;
	}

}


