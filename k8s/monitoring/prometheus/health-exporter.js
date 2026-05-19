const http = require('http');

http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    let metrics = '';
    
    // Scrape Backend (Postgres & Kafka)
    try {
      const response = await fetch('http://host.docker.internal:8080/q/health/ready');
      if (response.ok) {
        const data = await response.json();
        const pgCheck = data.checks.find(c => c.name.includes('PostgreSQL'));
        const kafkaCheck = data.checks.find(c => c.name.includes('Messaging') || c.name.includes('Kafka'));
        
        metrics += `health_postgres ${pgCheck && pgCheck.status === 'UP' ? 1 : 0}\n`;
        metrics += `health_kafka ${kafkaCheck && kafkaCheck.status === 'UP' ? 1 : 0}\n`;
      } else {
        metrics += `health_postgres 0\nhealth_kafka 0\n`;
      }
    } catch (e) {
      metrics += `health_postgres 0\nhealth_kafka 0\n`;
    }

    // Scrape Frontend
    try {
      const response = await fetch('http://host.docker.internal:5173/health.json', {
        headers: { 'Host': 'localhost' }
      });
      if (response.ok) {
        const data = await response.json();
        metrics += `health_frontend ${data.status === 'UP' ? 1 : 0}\n`;
      } else {
        metrics += `health_frontend 0\n`;
      }
    } catch (e) {
      metrics += `health_frontend 0\n`;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(metrics);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(9999, () => {
  console.log('Health Exporter running on port 9999');
});
