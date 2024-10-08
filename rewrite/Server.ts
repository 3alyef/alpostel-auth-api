import express from "express";
import { router } from "./routes/routes";
import cors from "cors";
import { authenticate } from "./db/DB";
import path from "path";
class Server {
  public server: express.Application;
	private allowOrigin: string[];

  constructor(port: string) {
		this.allowOrigin = [
			process.env.M2_URL || "",
			process.env.CLIENT_WB_URL || ""
		];
    this.server = express();
    this.jsonParse();
    this.setupCors();
    this.routes();
		this.authDB();
		this.startCSS();
		this.startServer(port);
  }

  private jsonParse(): void {
    this.server.use(express.json());
  };

  private setupCors(): void {
    this.server.use(
      cors({
        origin: this.allowOrigin,
        methods: ["GET", "PUT", "POST", "DELETE"],
      })
    );
  }

  private routes(): void {
    this.server.use(router);
  };

	private authDB(): void {
		authenticate();
	}

	private startCSS() {
		this.server.use(express.static(path.join(__dirname, '../public')));
	}
	private startServer(PORT: string): void {
		this.server.listen(PORT, () => {
			console.log(`Server running on PORT: ${PORT}`);
		})
	}
}

export { Server };
