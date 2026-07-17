const WebSocket = require('ws');
const http = require('http');

// Phải có 1 trang web giả để Render không báo lỗi "Cổng bị đóng"
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Tong dai Dong Bo Hendy dang hoat dong tren Render!');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('🦊 Một Tab Chrome vừa kết nối!');
    
    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

// Bắt buộc phải dùng process.env.PORT trên Render
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Tổng đài đã sẵn sàng trên cổng ${PORT}`);
});
