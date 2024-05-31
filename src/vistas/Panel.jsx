import React, {useState} from 'react'

import '../App.css'
import TablaPendientes from "../components/TablaPendientes.jsx";
import TablaResueltos from "../components/TablaResueltos.jsx";

import {Button} from "@nextui-org/react";
import { GlobalProvider} from "../context/GlobalContext.jsx";


export default function Panel() {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <GlobalProvider>
          <div className="flex flex-col gap-y-5 justify-center p-12">
            <h1>Administracion de incidencias</h1>
            <div>
                <TablaPendientes />
            </div>
            <div>
                <TablaResueltos />
            </div>
            <div className='flex justify-end'>
                <Button className="text-xl rounded-full" color="success" variant='solid' onClick={()=>setModalVisible(true)}>
                Añadir Ticket
                </Button>

            </div>
          </div>
        </GlobalProvider>
  )
}

