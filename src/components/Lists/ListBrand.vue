<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="mb-3">
          <label for="search" class="form-label">Buscar marca:</label>
          <input type="text" id="search" class="form-control" v-model="searchQuery" placeholder="Buscar por nombre">
        </div>
        <div class="row">
          <div class="col-md-12">
            <button @click="addBrand" class="btn btn-success">Agregar marca</button>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nombre de Marca</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="brand in filteredBrands" :key="brand.name">
                <td>{{ brand.name }}</td>
                <td>
                  <button @click="viewBrand(brand)" class="btn btn-primary">Ver marca</button>
                  <button @click="deleteBrand(brand)" class="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from "axios";
import { API_URL } from "@/config";

export default {
  name: 'BrandList',
  data() {
    return {
      brands: [
        { name: 'Adidas' },
        { name: 'Tommy Hilfiger' },
        { name: 'Nike' },
      ],
      searchQuery: '',
    };
  },
  computed: {
    filteredBrands() {
      return this.brands.filter((brand) => {
        return brand.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    addBrand() {
      // Lógica para agregar una nueva marca
      // ...
    },
    viewBrand(/*brand*/) {
      // Lógica para ver los detalles de una marca
      // ...
    },
    deleteBrand(brand) {
      // Lógica para eliminar una marca
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Se eliminará la marca ${brand.name}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Lógica para eliminar la marca aquí
          // ...

          Swal.fire({
            title: 'Eliminada',
            text: 'La marca ha sido eliminada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    },
  },
  mounted() {
    this.$state.navbarTitle = 'Lista de Marcas';
    // Obtener todas las marcas desde la API
    axios.get(API_URL + '/brands').then(response => {
      this.brands = response.data;
    }).catch(error => {
      console.log(error);
    });
  },
};
</script>

<style>
.container {
  padding-top: 20px;
  padding-bottom: 20px;
}

.text-primary {
  color: #007bff;
}

.table {
  margin-top: 20px;
}

.table th,
.table td {
  padding: 8px;
  vertical-align: middle;
}

.table th {
  background-color: #f2f2f2;
}

@media (max-width: 576px) {
  .table-responsive {
    overflow-x: auto;
  }
}
</style>