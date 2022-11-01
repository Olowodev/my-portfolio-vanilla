import highway from "@dogstudio/highway";
import { three } from "./Three";

export default class CustomRenderer extends highway.Renderer {
    onEnterCompleted() {
        three()
    }
}