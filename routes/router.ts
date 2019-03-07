import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.post('/mensajes', (req: Request, res: Response) => {

    const de = req.body.de;
    const cuerpo = req.body.cuerpo;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        mensaje: 'Todo está OK'
    });
})

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo: `${cuerpo}`,
        de,
        id
    });
})

router.get('/usuarios', (req: Request, res: Response) => {
    
    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            clientes
        })
    })
    // const usuarios 
    
})

router.get('/usuarios/detalle', (req: Request, res: Response) => {

    console.log(usuariosConectados.getLista());
    
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })


})

export default router;