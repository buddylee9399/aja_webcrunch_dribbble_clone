// $(document).on('turbo:load', function() {
// 	alert('im in shots file');
// });

$(document).on('turbo:load', function() {
	// alert('im in image load');
	var Shots = {
		previewShot() {
			if (window.File && window.FileList && window.FileReader) {

				function handleFileSelect(evt) {
					// alert('im in file select');
					evt.stopPropagation();
					evt.preventDefault();
					dropZone.classList.remove('dragging');

					let files = evt.target.files || evt.dataTransfer.files; 
					// console.log(files);
					// files is a FileList of File objects. List some properties.
					for (var i = 0, f; f = files[i]; i++) {

						// Only process image files.
						if (!f.type.match('image.*')) {
							continue;
						}
						const reader = new FileReader();

						// Closure to capture the file information.
						reader.onload = (function(theFile) {
							return function(e) {
								// Render thumbnail.
								let span = document.createElement('span');
								span.innerHTML = ['<img class="preview-thumb" src="', e.target.result,
									'" title="', escape(theFile.name), '"/>'
								].join('');
								document.getElementById('list').insertBefore(span, null);
							};
						})(f);

						// Read in the image file as a data URL.
						reader.readAsDataURL(f);
					}
				}

				function handleDragOver(evt) {
					// alert('im in handle drag over function');
					evt.stopPropagation();
					evt.preventDefault();
					dropZone.classList.add('dragging');
					// console.log(evt);

					// this adds the little '+' icon when dropping in zone
					evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
				}

				// Setup the dnd listeners.
				// https://stackoverflow.com/questions/47515232/how-to-set-file-input-value-when-dropping-file-on-page
				const dropZone = document.getElementById('drop_zone');
				const target = document.documentElement;
				const fileInput = document.getElementById('shot_user_shot');
				const previewImage = document.getElementById('previewImage');
				const newShotForm = document.getElementById('new_shot');
				// console.log(newShotForm);


				if (dropZone) {
					// alert('yes dropzone');
					dropZone.addEventListener('dragover', handleDragOver, false);

					dropZone.addEventListener('drop', handleFileSelect, false);

					dropZone.addEventListener('dragleave', (e) => {
						dropZone.classList.remove('fire');
					}, false);

					dropZone.addEventListener('drop', (e) => {
						e.preventDefault();
						// console.log(e);
						dropZone.classList.remove('fire');
						fileInput.files = e.dataTransfer.files;
						// if on shot/id/edit hide preview image on drop
						if (previewImage) {
							// alert('in preview image');
							previewImage.style.display = 'none';
						}
						// If on shots/new hide dropzone on drop
						if(newShotForm) {
							dropZone.style.display = 'none';
						}
					}, false);

					// Body specific 
					target.addEventListener('dragover', (e) => {
						// alert('im in target');
						e.preventDefault();
						// console.log(e);
						dropZone.classList.add('dragging');
					}, false);

					// removes dragging class to body WHEN NOT dragging
					target.addEventListener('dragleave', (e) => {
						dropZone.classList.remove('dragging');
						dropZone.classList.remove('fire');
					}, false);
				}
			}
		},
		shotHover() {
			$('.shot').hover(function() {
				$(this).children('.shot-data').toggleClass('visible');
			});
		}

	};
	Shots.previewShot();
	
	// this is for the index page, when you hover over the image
	Shots.shotHover();


});