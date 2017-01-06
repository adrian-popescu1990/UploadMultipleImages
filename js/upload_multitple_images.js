var uploadMultitpleImagesComponent = function (containerId) {

	var self = this,
		canvas, $canvas,
		images = [];

	this.init = function () {

		console.log(containerId);
		this.drawCanvas();
		this.addCanvasEvents();
		return;

		this.uploadImage();
		this.saveAdd();
		this.editAdd();
		this.submitForm();
		this.closeOverlay();
		this.saveCropImage();
	}

	// draw canvas and input file
	this.drawCanvas = function () {

		$('#' + containerId).append('<input type="file" class="upload-images hidden">');
		$('#' + containerId).append('<canvas width="' + $('#' + containerId).width() + '" height="' + $('#' + containerId).height() + '"></canvas>');

		$canvas = $('#' + containerId).find('canvas');
		canvas = $canvas[0];

	}

	// add canvas events
	this.addCanvasEvents = function () {

		// Add event listener for `mouse down` events.
		canvas.addEventListener('mousedown', function(event) {

			self.handleMouseDown();

		}, false);

	}

	this.handleMouseDown = function () {

		var canvasLeft = $canvas.offset().left,
			canvasTop = $canvas.offset().top,
			x = event.pageX - canvasLeft,
			y = event.pageY - canvasTop,
			clickedOnImage = false;

		if (images.length > 0) {
			draggingImageIndex = self.imageIndex(images, x, y);
			if (draggingImageIndex > -1) {
				clickedOnImage = true;
			}
		}

		if (clickedOnImage) {
			console.log('mda');
		}
		else {
			$(this).parent().find('.upload-images').click();
		}

		if (canvas.id == 'left-add') {
			images = leftImages;
		} else {
			images = rightImages;
		}

		return;

		lastPosition = {
			x : event.pageX,
			y : event.pageY
		};
		draggingImage = true;

		// redraw all images
		self.drawAllImages(canvas);

		// draw the current image last
		self.drawImage(canvas, images[draggingImageIndex].img, images[draggingImageIndex].left, images[draggingImageIndex].top, images[draggingImageIndex].width, images[draggingImageIndex].height);

		// add border of selected image
		self.drawBorder(canvas);

		if (draggingResizer !== -1) {
			// draw anchors
			self.drawAnchors(canvas);
		}

	}

	self.init();

}
