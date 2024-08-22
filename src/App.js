import React, { useState, useEffect } from 'react';
import LoginPage from './page/login/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import UnitPage from './page/unit/UnitPage';
import MilitaryPage from './page/military/MilitaryPage';
import RelativePage from './page/relatives/RelativePage';
import GroupUserPage from './page/groupUser/GroupUserPage';
import ForeignLanguagePage from './page/foreignlanguage/ForeignLanguagePage';
import ListRolePage from './page/roles/ListRolePage';
import UnitDetailPage from './page/unit/UnitDetailPage';
import ForeignLanguageDetailPage from './page/foreignlanguage/ForeignLanguageDetailPage';
import DecisionPage from './page/decision/DecisionPage';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<AdminLayout />} >
            <Route path='/Home/Unit' element={<UnitPage />} />
            <Route path='/Home/Military' element={<MilitaryPage />} />
            <Route path='/Home/Relative' element={<RelativePage />} />
            <Route path='/Home/GroupUser' element={<GroupUserPage />} />
            <Route path='/Home/ForeignLanguage' element={<ForeignLanguagePage />} />
            <Route path='/Home/Role' element={<ListRolePage />} />
            <Route path='/Home/UnitDetail/:id' element={<UnitDetailPage />} />
            <Route path='/Home/ForeignLanguage/:id' element={<ForeignLanguageDetailPage />} />
            <Route path='/Home/Decision' element={<DecisionPage />} />
          </Route>
        </Routes>
      </Router>

    </>

  );
}

export default App;
