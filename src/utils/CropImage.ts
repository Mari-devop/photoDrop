export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((res, rej) => {
        const image = new Image();
        image.addEventListener('load', () => res(image));
        image.addEventListener('error', (error) => rej(error));
        image.src = url;
    });

export const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<ArrayBuffer> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get 2D context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(
        pixelCrop.width / 2,
        pixelCrop.height / 2,
        pixelCrop.width / 2,
        0,
        2 * Math.PI
    );
    ctx.closePath();
    ctx.fill();

    return new Promise<ArrayBuffer>((res, rej) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                rej(new Error('Canvas is empty'));
                return;
            }
            const arrayBuffer = await blob.arrayBuffer();

            // Convert ArrayBuffer to Base64 for viewing
            const base64String = await arrayBufferToBase64(arrayBuffer);
            localStorage.setItem('croppedImageBase64', base64String); // Store in localStorage

            res(arrayBuffer);
        }, 'image/jpeg');
    });
};

// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
