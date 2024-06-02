import React, {useContext, useEffect, useState} from "react";
import '../App.css'
import TablaPendientes from "../components/TablaPendientes.jsx";
import TablaResueltos from "../components/TablaResueltos.jsx";
import {GlobalContext} from "../context/GlobalContext.jsx";
import {Button} from "@nextui-org/react";
import ModalForm from "../components/ModalForm.jsx";




export default function Panel() {
    const {dades, setDades} = useContext(GlobalContext);
    const [modalVisible, setModalVisible] = useState(false)
    const [ticketType, setTicketType] = useState(false)

    const toggleModal = (formTicketType) =>{
        setTicketType(formTicketType)
        setModalVisible(true)
    }
  useEffect(() => {
      const cargarDatos = async () => {
          const responseTicketsPendientes = await fetch('https://json-server-examen-final.vercel.app/ticketsPendientes');
          const responseTicketsResueltos = await fetch('https://json-server-examen-final.vercel.app/ticketsResueltos');
          const ticketsPendientes = await responseTicketsPendientes.json();
          //Como ya estaba el JSON ordenado he usado la funcion de añadir ticket para generar uno anterior a todos
          //split para separar los elementros de la fecha teniendo en cuanta la "/"
          //con reverse le damos la vuelta al dia y el año
          //Join para volver a juntarlos y poder comparar las instancias de date
          ticketsPendientes.sort((a, b) => {
              const dateA = new Date(a.fecha.split('/').reverse().join('-'));
              const dateB = new Date(b.fecha.split('/').reverse().join('-'));
              return dateA - dateB;
          });
          const ticketsResueltos = await responseTicketsResueltos.json();
          ticketsResueltos.sort((a, b) => {
              const dateA = new Date(a.fecha.split('/').reverse().join('-'));
              const dateB = new Date(b.fecha.split('/').reverse().join('-'));
              return dateA - dateB;
          });
          const data = {ticketsPendientes, ticketsResueltos}

          setDades(data);
      };
      cargarDatos()
  }, [setDades]);


    return (
          <div className="flex flex-col gap-y-5 justify-center p-12">
                <h1>Administracion de incidencias</h1>
              <div>
                  <h3>Tickets Pendientes</h3>
                  {dades.ticketsPendientes ? <TablaPendientes ticketsPendientes={dades.ticketsPendientes}/> : ''}
                  <div className='flex justify-end'>
                      <Button className="text-xl rounded-full" color="success" variant='solid' onClick={()=>toggleModal('ticketsPendientes')}>
                          Añadir Ticket
                      </Button>
                  </div>
              </div>
              <div>
                  <h3>Tickets Resueltos</h3>

                  {dades.ticketsResueltos ? <TablaResueltos ticketsResueltos={dades.ticketsResueltos}/> : ''}
                  <div className='flex justify-end'>
                      <Button className="text-xl rounded-full" color="success" variant='solid' onClick={()=>toggleModal('ticketsResueltos')}>
                          Añadir Ticket
                      </Button>
                  </div>
              </div>
              <ModalForm isVisible={modalVisible} setIsVisible={setModalVisible} ticketType={ticketType}/>
          </div>
    )
}

