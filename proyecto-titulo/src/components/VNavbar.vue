<script setup>
import { getLoggedUser } from '../utils/auth';
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container container-navbar">
        <!-- Logo -->
        <a class="navbar-brand" href="/">
          <img src="/images/logo.png" class="img-fluid" alt="FurryCom" />
        </a>
        <!-- Boton menu response -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Opciones menú -->
        <div class="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" key="buscar" to="buscar">Busca tu mascota</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" key="historias" to="historias">Historias</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" key="organizaciones" to="organizaciones"
                >Organizaciones</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" key="quienes" to="quienes-somos"
                >Quienes Somos</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" key="registrar" to="registrar-caso"
                >Registrar Caso</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" key="reporte" to="reporte-plus"
                >ReportesPLUS</router-link
              >
            </li>
            <li v-if="getLoggedUser()" class="nav-item">
              <router-link class="nav-link" key="logout" to="logout">Logout</router-link>
            </li>
            <li v-else class="nav-item">
              <router-link class="nav-link" key="login" to="login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
