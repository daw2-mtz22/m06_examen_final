import React, {useContext, useState} from "react";
import {Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {GlobalContext} from "../context/GlobalContext.jsx";
import ModalForm from "./ModalForm.jsx";

export default function TablaPendientes({ticketsPendientes}){
    const {dades, setDades,dataTicket, setDataTicket} = useContext(GlobalContext);
    const [modalVisible, setModalVisible] = useState(false)
    const ticketType = 'ticketsPendientes'

    const toggleModal = (ticketPendiente) =>{
        setDataTicket(ticketPendiente)
        setModalVisible(true)
    }

    const controladorBorrarTicket  = async (ticketId)=>{
        await fetch(`https://json-server-examen-final.vercel.app/ticketsPendientes/${ticketId}`, {
            method: 'DELETE'
        });

        setDades({...dades, ticketsPendientes:dades.ticketsPendientes.filter(ticket => ticket.id !== ticketId)});
    }
    const controladorResolveTicket = async (ticketPendiente)=>{
        const reponseDelete =         await fetch(`https://json-server-examen-final.vercel.app/ticketsPendientes/${ticketPendiente.id}`, {
            method: 'DELETE'
        });
        delete ticketPendiente.id
        if(reponseDelete.status === 200){
            const response = await fetch(`https://json-server-examen-final.vercel.app/ticketsResueltos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(ticketPendiente)
            });

            const responseNewTicket = await response.json();
            setDades({ticketsPendientes:dades.ticketsPendientes.filter(ticket => ticket.id !== ticketPendiente.id), ticketsResueltos: [...dades.ticketsResueltos, responseNewTicket]});

        }
    }
     return (
        <>
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
              <TableBody items={ticketsPendientes}>
                  {(item) => (
                      <TableRow key={item.codigo}>
                          {(columnKey) => columnKey !== 'status'
                              ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                              : <TableCell>
                                  <div className={'flex items-center'}>
                                    <Button color="success" variant="flat" onClick={()=>controladorResolveTicket(item)}> Resolver</Button>
                                    <Button color="success" variant="flat" onClick={()=>toggleModal(item)} > Editar</Button>
                                    <Button color="success" variant="flat" > Comentar</Button>
                                    <Button color="success" variant="flat" onClick={()=>{controladorBorrarTicket(item.id)}} > Eliminar</Button>
                                  </div>
                              </TableCell>
                          }
                      </TableRow>
                  )}
              </TableBody>
            </Table>
            <ModalForm isVisible={modalVisible} setIsVisible={setModalVisible} dataForm={dataTicket} ticketType={ticketType}/>
        </>
    );
}