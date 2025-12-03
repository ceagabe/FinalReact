
import React from 'react'
import { Link } from 'react-router-dom'
function Contacto(){
  return (
    <>

   <div class="row justify-content-center">
    <div class=" col-12 col-md-5 border p-4 rounded shadow-sm">
        <h2 >Formulario de contacto</h2>
        <form >
            <div >
            <input placeholder="Escribe tu nombre" required=""  type="text" value="" ></input>
            </div>
            <div >
                <input placeholder="@correo" required=""  type="email" value="" ></input>
            </div>
                <div class="mb-3"><textarea class="form-control" placeholder="Escribe tu mensaje..." rows="4" maxlength="200" required="">
                    </textarea>
                    <div id="contador" class="form-text text-muted text-end">0 / 200 caracteres</div>
                    </div>
                <button type="submit" class="sc-jJLAfE jmXToI btn btn-primary flex-grow-1" fdprocessedid="co7ji6">Enviar</button>
                    </form>
                    </div>
                    </div>
   </>
  );
}

export default Contacto