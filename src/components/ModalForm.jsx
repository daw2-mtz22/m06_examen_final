import React, {useContext} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea, Input
} from "@nextui-org/react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export default function ModalForm ({isVisible, setIsVisible, dataForm=null, ticketType}) {
    const {dades, setDades, dataTicket, setDataTicket} = useContext(GlobalContext);

    const handleClose = () => {
        setDataTicket({})
        setIsVisible(false)
    };
    const controladorFormTicket  = (value, field)=>{
        setDataTicket(
            {...dataTicket, [field]:value})
    }
    const controladorNuevoTicket = async (newTicket, ticketType)=>{
        const response = await fetch(`https://json-server-examen-final.vercel.app/${ticketType}`, {
            method: 'POST',
            //Sin este header no funciona, no sé envía como JSON
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newTicket)
        });

        const responseNewTicket = await response.json();

        setDades({...dades, [ticketType]:[...dades[ticketType], responseNewTicket] });
        handleClose()
    }

    const controladorActualizaTicket = async (formTicket)=>{
        const response = await fetch(`https://json-server-examen-final.vercel.app/ticketsPendientes/${formTicket.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formTicket)
        });
        const ticketActualizado = await response.json();
        setDades({...dades, [ticketType]:dades[ticketType].map(ticket=> ticket.id === ticketActualizado.id ? ticketActualizado : ticket)})
        handleClose()}
    return (
        <>
            <Modal
                isOpen={isVisible}
                onClose={handleClose}
                placement="top-center"
            >
                <ModalContent>
                    {(handleClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{!dataForm ? 'Añadir Ticket' : 'Editar Ticket'}</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="codigo"
                                    placeholder="codigo"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.codigo}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'codigo')}}
                                />
                                <Input
                                    autoFocus
                                    label="Fecha"
                                    placeholder="Ejemplo: Marzo de 2024"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.fecha}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'fecha')}}
                                />
                                <Input
                                    autoFocus
                                    label="Nombre"
                                    placeholder="Nombre"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.alumno}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'alumno')}}
                                />
                                <Input
                                    autoFocus
                                    label="Aula"
                                    placeholder="Aula"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.aula}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'aula')}}
                                />
                                <Input
                                    autoFocus
                                    label="Grupo"
                                    placeholder="Grupo"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.grupo}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'grupo')}}
                                />
                                <Input
                                    autoFocus
                                    label="Ordenador"
                                    placeholder="Ordenador"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.ordenador}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'ordenador')}}
                                />
                                <Textarea
                                    label="Descripcion"
                                    placeholder="Descripcion"
                                    variant="bordered"
                                    value= {!dataForm ? undefined : dataForm.descripcion}
                                    onChange={(e)=>{ controladorFormTicket(e.target.value, 'descripcion')}}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={handleClose}>
                                    Cerrar
                                </Button>
                                {!dataForm ?
                                    <Button color="primary" onClick={()=>{
                                        controladorNuevoTicket(dataTicket, ticketType)}}>
                                        Añadir Ticket
                                    </Button> :
                                    <Button color="primary" onClick={()=>{controladorActualizaTicket(dataTicket)}}>
                                        Editar
                                    </Button>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
