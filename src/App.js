import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './Components/ItemListContainer/ItemDetailContainer';
import Cart from './Components/Cart/Cart';
import { AddCartContextProvider } from './Context/cartContext';
import React from 'react';
import FormOrder from './Components/FormOrder/FormOrder';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ItemIndex from './Components/ItemIndex/ItemIndex';
import HistoryRegistered from './Components/HistoryRegistered/HistoryRegistered';
import HistoryList from './Components/ItemList/HistoryList';
import ItemConsulta from './Components/ItemListContainer/ItemConsulta';
import ItemConsultaPorDni from './Components/ItemListContainer/ItemConsultaPorDni';
import ItemConsultaPorOsocial from './Components/ItemListContainer/ItemConsultaPorOsocial';
import Footer from './Components/Footer/Footer';


function App() {

  return (
    <div className="App">
      <AddCartContextProvider>
        <BrowserRouter>
          <NavBar />
          <div className="App-header">
            <Routes>
              <Route path='/' element={<ItemIndex />}></Route>
              <Route path='/category/:categoryId' element={<ItemListContainer />}></Route>
              <Route path='/detail/:paramId' element={<ItemDetailContainer />}></Route>
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='/formOrder' element={<FormOrder />}></Route>
              <Route path='/historyRegistered' element={<PrivateRoute privType='historyRegistered'><HistoryRegistered /></PrivateRoute>}></Route>
              <Route path='/consultar' element={<ItemConsulta />}></Route>
              <Route path='/consultar-por-dni' element={<ItemConsultaPorDni />}></Route>
              <Route path='/consultar-por-obra-social' element={<ItemConsultaPorOsocial />}></Route>
              <Route path='/consultedHistory' element={<HistoryList />}></Route>
              <Route path='*' element={<h2>Not found</h2>}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AddCartContextProvider>
    </div>
  );
}

export default App;
