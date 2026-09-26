module.exports = {
  apps: [
    {
      name: "practica-7-backend",

      // package.json -> npm start
      script: "npm",
      args: "start",

      // Requerido por la práctica: PM2 Cluster Mode
      instances: "max",
      exec_mode: "cluster",

      env: {
        NODE_ENV: "production",
        PORT: 3000
      },

      // Logs
      error_file: "/var/www/backend-app/logs/err.log",
      out_file: "/var/www/backend-app/logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      autorestart: true,
      watch: false
    }
  ],

  deploy: {
    production: {
      user: "ubuntu",
      host: "3.138.52.179",

      ref: "origin/main",

      repo: "git@github.com:SUyaguari/Practica-7-despliege-Aws-Backend.git",

      path: "/var/www/backend-app/pm2-deploy",

      "post-deploy":
        "mkdir -p /var/www/backend-app/logs && npm install && pm2 reload ecosystem.config.js --env production && pm2 save",

      ssh_options: "IdentityFile=~/.ssh/ssh-instacia.pem"
    }
  }
};
