class ResourceManager {
    static imagelist: Record<string, HTMLImageElement> = {};
    static soundList: Record<string, HTMLAudioElement> = {};
    static imgpathlist: string[] = [];
    static deploy: boolean = true;
    static KEY: string;
    static initialize() {
    }


    static loadFont = async () => {
        const font = new FontFace("PressStart", `url('${ResourceManager.KEY}/assets/fonts/PressStart.ttf')`);

        try {
            await font.load();
            (document.fonts as any).add(font);
        } catch (err) {
            console.error("Failed to load font", err);
        }
    };
    static async loadImages(list: string[]) {
        if (ResourceManager.deploy){
            ResourceManager.KEY='https://beastkr.github.io/dont-touch-spike-engine'
        }
        else ResourceManager.KEY = '../..'       
        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = ResourceManager.KEY + '/assets/images/' + src;
            });
        };

        for (const filename of list) {
            try {
                const img = await loadImage(filename);
                const key = '/assets/images/' + filename;
                ResourceManager.imagelist[key] = img;
            } catch (error) {
                console.error(`Failed to load image: ${filename}`, error);
            }
        }
    }


    static async loadSounds(list: string[]) {
        if (ResourceManager.deploy){
            ResourceManager.KEY='https://beastkr.github.io/dont-touch-spike-engine'
        }
        else ResourceManager.KEY = '..'
        const loadSound = (src: string): Promise<HTMLAudioElement> => {
            return new Promise((resolve, reject) => {
                const sfx = new Audio(ResourceManager.KEY + '/assets/sfx/' + src);
                sfx.preload = 'auto';

                sfx.oncanplaythrough = () => resolve(sfx); // wait until it's ready to play
                sfx.onerror = () => reject(new Error(`Failed to load sound: ${src}`));
            });
        };

        for (const filename of list) {
            try {
                const audio = await loadSound(filename);
                const key = '/assets/sfx/' + filename;
                ResourceManager.soundList[key] = audio;
            } catch (error) {
                console.error(`Failed to load sound: ${filename}`, error);
            }
        }
    }



    static addtolist(list: string[]) {
        for (var img of list) ResourceManager.imgpathlist.push(img);
    }

    

}

export default ResourceManager;