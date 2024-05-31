import Ticket from "./Ticket.jsx";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";
import {Table, TableHeader, TableColumn, TableBody} from "@nextui-org/react";

export default function TablaPendientes(){
    const {dades, setDades, dataTicket, setDataTicket} = useContext(GlobalContext);

    useEffect(() => {
        const cargarDatos = async () => {
            const response = await fetch('/bd.json');
            const data = await response.json();
            setDades(data);
        };

        cargarDatos()
    }, [setDades]);

    const controladorBorrarHistoria  = async (codigo)=>{
        await fetch(`borrarTicket`, {
            method: 'DELETE'
        });
        //Habría que poner alguna validacion
        setDades(dades.filter(ticket => ticket.codigo !== codigo));
    }
    const datos = []
          return (
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Codigo</TableColumn>
                <TableColumn>Fecha</TableColumn>
                <TableColumn>Aula</TableColumn>
                <TableColumn>Grupo</TableColumn>
                <TableColumn>Descripcion</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>Alumno</TableColumn>
                <TableColumn>Grupo</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
              {datos.map(tickets=>(
                        <Ticket key={tickets} datos={tickets} />
                    ))}

              </TableBody>
            </Table>
          );
        }