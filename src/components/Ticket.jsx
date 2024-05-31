import React from "react";
import {TableRow,Button, TableCell} from "@nextui-org/react";

export default function Ticket(datos) {
    const {dades, setDades} = useContext(GlobalContext);


    const controladorActualizaTicket = async (datosTicket)=>{
        const response = await fetch(`json-server/${datosTicket.id}`, {
            method: 'PUT',
            //Sin este header no funciona, no sé envía como JSON
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosTicket)
        });
        //Habría que poner alguna validacion

        const ticketActualizada = await response.json();

        setDades(dades.map(ticket=> ticket.codigo === ticketActualizada.id ? ticketActualizada : ticket));    }
    return (
            <TableRow key="1">
            <TableCell>Codigo</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Aula</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Alumno</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>                                
                <Button color="success" variant="flat" > Resolver</Button>
            </TableCell>
            <TableCell>
                <Button color="success" variant="flat" > Editar</Button>
                </TableCell>
            <TableCell>
                <Button color="success" variant="flat" > Comentar</Button>
                </TableCell>
            <TableCell>
                <Button color="success" variant="flat" > Eliminar</Button>
                </TableCell>
            </TableRow>
    );
}
