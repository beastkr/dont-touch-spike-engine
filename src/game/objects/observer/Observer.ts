class Observer {
    static events: Map<string, Map<string, () => void>>

    static attach(event: string, funcname: string, func: () => void) {
        if (!this.events) {
            this.events = new Map<string, Map<string, () => void>>()
        }
        if (!this.events.has(event)) {
            this.events.set(event, new Map<string, () => void>())
        }
        this.events.get(event)?.set(funcname, func)
    }

    static raiseEvent(event: string) {
        if (this.events.has(event)) {
            const t = this.events.get(event) || new Map<string, () => void>()
            for (const f of t) {
                f[1]()
            }
        }
    }
}

export default Observer
