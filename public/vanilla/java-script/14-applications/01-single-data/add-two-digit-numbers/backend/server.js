import http from 'node:http';
import pool from './db.js';

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  // GET /api/answer-colors
  if (req.method === 'GET' && req.url === '/api/answer-colors') {
    try {
      const result = await pool.query(
        'SELECT * FROM answer_colors ORDER BY id'
      );

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify(result.rows));
    } catch (error) {
      console.error(error);

      res.writeHead(500, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          error: 'Database error',
        })
      );
    }

    return;
  }


  // GET /api/answer-color?isCorrect=true
  if (req.method === 'GET' && req.url.startsWith('/api/answer-color')) {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);

      const isCorrect = url.searchParams.get('isCorrect');

      const result = await pool.query(
        `
          SELECT color
          FROM answer_colors
          WHERE is_correct = $1
        `,
        [isCorrect === 'true']
      );

      if (result.rows.length === 0) {
        res.writeHead(404, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            error: 'Color not found',
          })
        );

        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify(result.rows[0]));
    } catch (error) {
      console.error(error);

      res.writeHead(500, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          error: 'Database error',
        })
      );
    }

    return;
  }

  // 404
  res.writeHead(404, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      error: 'Not found',
    })
  );
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});