const downloadButton = document.querySelector('.button_download-images');
const gallery = document.querySelector('.gallery');

async function fetchData() {
    try {
        const bigLoader = document.createElement('div');
        bigLoader.className = 'loader loader_big';
        gallery.append(bigLoader);

        const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
        const data = await response.json();
        let images = [];
        if (data.message) {
            images = data.message;
        } else {
            for (let item of data) {
                images.push(item.url)
            }
        }

        bigLoader.remove()

        images.forEach((url) => {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'gallery__image-container';
            imageContainer.innerHTML = `<div class="loader loader_small"></div>`

            gallery.append(imageContainer);

            const image = document.createElement('img');
            image.src = url;
            image.onload = function() {
                imageContainer.innerHTML = `<img src="${image.src}" class="gallery__image-container__image">`
            }
        });

        if (response.ok) {
            this.innerHTML = 'Загрузить картинки';
        }
    } catch (error) {
        console.error(error)
    }

}

downloadButton.addEventListener('click', fetchData)