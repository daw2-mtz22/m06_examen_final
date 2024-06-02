import React from 'react'
import { Button, Input } from '@nextui-org/react'

export default function Login(){
  return (
    <section id="contacta" className="pt-10 pb-20 overflow-hidden">
        <div className="flex justify-center">
          <div className="w-full lg:w-8/12 px-4">
            <div
              className="bg-primary bg-opacity-[3%] dark:bg-dark rounded-md p-11 mb-12 lg:mb-5 sm:p-[55px] lg:p-11 xl:p-[55px] wow fadeInUp"
              data-wow-delay=".15s
              ">
              <form>
                <div className="flex flex-wrap mx-[-16px]">
                  <div className="w-full md:w-1/2 px-4">
                    <div className="mb-8">
                      <Input type={'email'} label={'Email:'} placeholder={'Email'} isRequired/>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-4">
                    <div className="mb-8">
                      <Input type={'password'} label={'Contraseña:'} placeholder={'Contraseña'} isRequired/>
                    </div>
                  </div>

                  <div className="w-full px-4">
                    <Button color={'primary'} href="mailto:random@padelnice.com">
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </section>
  )
}