import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button} from "@nextui-org/react";

export default function TablaResueltos({ticketsResueltos}){
    const {dades, setDades} = useContext(GlobalContext);


    const controladorBorrarTicket  = async (ticketId)=>{
        await fetch(`https://json-server-examen-final.vercel.app/ticketsResueltos/${ticketId}`, {
            method: 'DELETE'
        });

        setDades({...dades, ticketsResueltos:dades.ticketsResueltos.filter(ticket => ticket.id !== ticketId)});
    }
    return (
        <Table >
            <TableHeader>
                <TableColumn key={'codigo'}>Codigo</TableColumn>
                <TableColumn key={'fecha'}>Fecha</TableColumn>
                <TableColumn key={'aula'}>Aula</TableColumn>
                <TableColumn key={'grupo'}>Grupo</TableColumn>
                <TableColumn key={'ordenador'}>STATUS</TableColumn>
                <TableColumn key={'descripcion'}>Descripcion</TableColumn>
                <TableColumn key={'alumno'}>Alumno</TableColumn>
                <TableColumn key={'status'}>Acciones</TableColumn>
            </TableHeader>
            <TableBody items={ticketsResueltos}>
                {(item) => (
                    <TableRow key={item.codigo}>
                        {(columnKey) => columnKey !== 'status'
                            ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            : <TableCell>
                                <div className={'flex items-center'}>
                                    <Button color="success" variant="flat" > Comentar</Button>
                                    <Button color="success" variant="flat" onClick={()=>{controladorBorrarTicket(item.id)}} > Eliminar</Button>
                                </div>
                            </TableCell>
                        }
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}