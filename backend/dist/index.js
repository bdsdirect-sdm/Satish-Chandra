"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const routes_1 = __importDefault(require("./routes/routes"));
const uploads_1 = __importDefault(require("./routes/uploads"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    optionsSuccessStatus: 200
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/', routes_1.default);
app.use('/', uploads_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log('Database connected.');
        yield database_1.default.sync(); // Creates the User table if it doesn't exist
        app.listen(3004, () => {
            console.log('Server is running  http://localhost:3004');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
startServer();
