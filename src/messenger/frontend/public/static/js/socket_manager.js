class SocketManager {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.onMessageCallBack = null;
        this.onStatusChange = null;
    }
    connect() {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            console.log('[WS] Connected');
            if (this.onStatusChange) this.onStatusChange(true);
        };

        this.socket.onmessage = (event) => {
            if (this.onMessageCallBack){
                this.onMessageCallBack(event.data);
            }
        };

        this.socket.onclose = (event) => {
            console.log('[WS] Disconnected', event.code);
            if (this.onStatusChange) this.onStatusChange(false);
            // todo: reconnect logic
        };

        this.socket.onerror = (error) => {
            console.error('[WS] Error', error);
        };
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
            return true;
        } else {
            console.warn('[WS] Cannot send, socket is closed');
            return false;
        }
    }
}