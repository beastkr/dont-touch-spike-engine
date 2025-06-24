class ResourceManager {
    static imagelist: Record<string, HTMLImageElement> = {};
    static imgpathlist: string[] = [];
    static initialize() {
    }
    static async loadImages(list: string[]) {
        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = 'https://beastkr.github.io/dont-touch-spike-engine/assets/images/' + src;
            });
        };

        for (const filename of list) {
            try {
                const img = await loadImage(filename);
                const key = '/assets/images/' + filename;
                ResourceManager.imagelist[key] = img;
                console.log(`Loaded image: ${key}`);
            } catch (error) {
                console.error(`Failed to load image: ${filename}`, error);
            }
        }
    }


    static addtolist(list: string[]) {
        for (var img of list) ResourceManager.imgpathlist.push(img);
    }
    

}

export default ResourceManager;