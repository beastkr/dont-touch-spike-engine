import Scene from "../../game-engine/Scene";
import SceneManager from "../../game-engine/SceneManager";

class ColliderController {
    static sceneColliderList: Map<string, ICollider[]> = new Map<string, ICollider[]>();
    static listcollider: ICollider[] = [];
    static size: Map<string, number> = new Map<string, number>();

    static reset(key: string) {
        let list = ColliderController.sceneColliderList.get(key);
        ColliderController.listcollider = list ? list : [];
    }
    static addcollider(coll: ICollider, key: string) {
        if (!ColliderController.sceneColliderList.has(key)) {
            ColliderController.sceneColliderList.set(key, []);
        }
        ColliderController.listcollider.push(coll);
        ColliderController.sceneColliderList.get(key)?.push(coll);
        ColliderController.size.set(key, (ColliderController.size.get(key) || 0) + 1);
    }
    static getAllColliders(key: string): ICollider[] {
        if (SceneManager.sceneList.has(key)) {
            return ColliderController.sceneColliderList.get(key) || [];
        }
        return [];
    }




}
export default ColliderController