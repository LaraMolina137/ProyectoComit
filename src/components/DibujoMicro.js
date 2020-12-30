import React from 'react';
import '../index.css';
import {Select} from '@material-ui/core';

const DibujoMicro = ({cantidadPasajero}) => {

    const [seleccion,setSeleccion] = React.useState(0);
    const [numero, setNumero] = React.useState([])

    function cambioColor(e) {
       
        console.log(e.target.value)
        if(seleccion<2)
        {
            setSeleccion(seleccion+1);
            e.target.style.background='#3f51b5';
        }
        else 
        {
            e.target.style.background='rgb(132, 226, 140)'
            setSeleccion(seleccion-1)
        }
          
              
    }

    return (<div className="general">
                <div className="titulo">
                    <p>PLANTA BAJA</p>
                    <p>PLANTA ALTA</p>
                    
                </div>
                <div className="DibujoMicro">
                    <div className="plantaBaja">
                        <div className="rowBaja">
                        
                            {/* <button value="61" className="asiento"  onClick={cambioColor} >61</button>
                            <button value="62" className="asiento" onClick={cambioColor}>62</button> */}
                            <div className="vacio"></div>
                            {/* <div value="61"className="asiento" onClick={cambioColor}>64</div> */}
                        </div>
                        <div className="rowBaja">
                            <div className="asiento" onClick={cambioColor}>65</div>
                            <div className="asiento">66</div>
                            <div className="vacio"></div>
                            <div className="asiento">68</div>
                        </div>
                        <div className="rowBaja">
                            <div className="asiento">69</div>
                            <div className="asiento">70</div>
                            <div className="vacio"></div>
                            <div className="asiento">72</div>
                        </div>
                        <div className="rowBaja">
                            <div className="asiento">73</div>
                            <div className="asiento">74</div>
                            <div className="vacio"></div>
                            <div className="asiento">76</div> 
                        </div>
                                
                    </div>
                    <div className="plantaAlta">
                        <div className="rowAlta">
                            <div className="asiento">1</div>
                            <div className="asiento">2</div>
                            <div className="vacio"></div>
                            <div className="asiento">3</div>
                            <div className="asiento">4</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">5</div>
                            <div className="asiento">6</div>
                            <div className="vacio"></div>
                            <div className="vacio"></div>
                            <div className="vacio"></div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">7</div>
                            <div className="asiento">8</div>
                            <div className="vacio"></div>
                            <div className="vacio"></div>
                            <div className="vacio"></div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">11</div>
                            <div className="asiento">12</div>
                            <div className="vacio"></div>
                            <div className="vacio"></div>
                            <div className="vacio"></div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">15</div>
                            <div className="asiento">16</div>
                            <div className="vacio"></div>
                            <div className="asiento">17</div>
                            <div className="asiento">18</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">19</div>
                            <div className="asiento">20</div>
                            <div className="vacio"></div>
                            <div className="asiento">21</div>
                            <div className="asiento">22</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">23</div>
                            <div className="asiento">24</div>
                            <div className="vacio"></div>
                            <div className="asiento">25</div>
                            <div className="asiento">26</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">27</div>
                            <div className="asiento">28</div>
                            <div className="vacio"></div>
                            <div className="asiento">29</div>
                            <div className="asiento">30</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">31</div>
                            <div className="asiento">32</div>
                            <div className="vacio"></div>
                            <div className="asiento">33</div>
                            <div className="asiento">34</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">35</div>
                            <div className="asiento">36</div>
                            <div className="vacio"></div>
                            <div className="asiento">37</div>
                            <div className="asiento">38</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">39</div>
                            <div className="asiento">40</div>
                            <div className="vacio"></div>
                            <div className="asiento">41</div>
                            <div className="asiento">42</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">43</div>
                            <div className="asiento">44</div>
                            <div className="vacio"></div>
                            <div className="asiento">45</div>
                            <div className="asiento">46</div>
                        </div>
                        <div className="rowAlta">
                            <div className="asiento">47</div>
                            <div className="asiento">48</div>
                            <div className="vacio"></div>
                            <div className="asiento">49</div>
                            <div className="asiento">50</div>
                        </div>
                    </div>
                    <div className="indicacion">
                        <div className="rowIndicacion">
                            <div className="disponible"></div>
                            <p>Disponible</p>
                        </div>
                        <div className="rowIndicacion">
                            <div className="seleccionado"></div>
                            <p>Seleccionado</p>
                        </div>
                        <div className="rowIndicacion">
                            <div className="ocupado"></div>
                            <p>Ocupado</p>
                        </div>
                    </div>
                </div>
    </div>
    );
};

export default DibujoMicro;