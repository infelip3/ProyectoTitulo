<script setup>
const organizations = [
  {
    title: 'Fundación Callejeros Buscan Hogar',
    paragraphs: [
      'Somos un grupo de voluntarios que rescatamos animales en total abandono o maltrato, los rehabilitamos, los esterilizamos , sanamos y volvemos a pegar sus corazones rotos, por tanta maldad, y les buscamos las mejores familias para ellos.',
      'Somos un Fundación sin fines de lucro, nuestro fuerza nos la dan ellos al verlos con una familia de verdad.',
    ],
    url: 'http://www.fundacioncbh.cl',
    email: 'contacto@fundacioncbh.cl',
    image: 'callejeros_buscan_hogar.png',
  },
  {
    title: 'Fundación Julieta',
    paragraphs: [
      'Julieta es una mestiza de pastor alemán rescatada que inspiró la creación de Fundación Julieta, organización dedicada al rescate de perros y gatos abandonados, su rehabilitación, sociabilización, esterilización y adopción.',
      'Creemos que la única forma de frenar el abandono animal es mediante la educación y el desarrollo de la empatía y compasión hacia los animales desde los niños.',
      'Nuestro mensaje es el bienanimal.',
    ],
    url: 'http://www.fundacionjulieta.cl/',
    email: 'quieroadoptar@fundacionjulieta.cl',
    image: 'julieta.png',
  },
  {
    title: 'Fundación Alma Animal de Rancagua',
    paragraphs: [
      'Agrupación animalista que busca mejorar las condiciones de vida de perros, gatos en situación de abandono, crear conciencia y educar sobre la tenencia responsable de mascotas.',     
    ],
    url: 'https://www.facebook.com/Alma-animal-Rancagua-Offical-450764244961909/',
    email: 'almaanimalrancagua@gmail.com',
    image: 'alma_animal_rancagua.jpg',
  },
  {
    title: 'Sociedad Protectora de Animales Osorno',
    paragraphs: [
      'Es una organización sin fines de lucro que se constituyó legalmente el 22 de noviembre de 1992, bajo la personalidad jurídica Municipal Nro.192-F, cuyo fin es ayudar a los animales, en especial a los abandonados.',    
    ],
    url: 'https://www.facebook.com/groups/379946608854836/?fref=ts',
    email: 'animalesosorno@gmail.com',
    image: 'sociedad_protectora_animales_osorno.jpg',
  },
  {
    title: 'Fundación Conciencia Animal de Rengo',
    paragraphs: [
      'Hace un tiempo un grupo de personas decidieron dejar las palabras a un lado y actuar frente a tanta miseria que viven muchos animalitos de Rengo, principalmente, por la indiferencia y la “tenencia irresponsable” hacia aquellos que un día fueron mascotas, o que simplemente nacieron en un círculo indolente.',
      'Conciencia Animal tiene el “motor del amor”, ya que el único fin de esta entidad, es ir en ayuda de los animalitos que sufren y que reciben de nuestra sociedad, golpes, maltrato e indiferencia.',
    ],
    url: 'https://www.facebook.com/conciencia.rengo',
    email: 'julia.espinoza.carrasco@gmail.com',
    image: 'conciencia_animal_rengo.jpg',
  },
  {
    title: 'Fundación Canes y felinos',
    paragraphs: [
      'Canes y Felinos Temuco es una organización no gubernamental, sin fines de lucro, que tiene por misión fomentar la tenencia responsable de mascotas y disminuir la sobrepoblación de fauna urbana existente en la Región de La Araucanía, principalmente en la comuna de Temuco.',
      'Es una organización con una preocupación pública, social, cuyo quehacer no puede reducirse exclusivamente a los “animales”, ya que el abandono de estos facilita, además, problemas de orden sanitario que repercuten en toda la comunidad.',
    ],
    url: 'http://www.canesyfelinos.com/',
    email: 'contacto@canesyfelinos.com',
    image: 'canes_y_felinos.png',
  },
  {
    title: 'Fundación Stuka',
    paragraphs: [
      'La ciencia del Bienestar Animal no es un tema nuevo, pero ha ido cobrando cada vez más importancia, tanto en el mundo científico como en las personas interesadas en brindar una calidad de vida cada vez mejor a nuestros animales de compañía.',
      'En Fundación Stuka nos interesamos en aplicar la ciencia del Bienestar Animal a cabalidad, esforzándonos por brindarles a nuestros perros (por el tiempo que se encuentren con nosotros) las mejores condiciones sanitarias, emocionales y naturales, para que, llegado el momento de la adopción, lleguen a sus nuevos hogares como individuos sanos y educados.',
    ],
    url: 'http://www.fundacionstuka.cl/',
    email: 'contacto@fundacionstuka.cl',
    image: 'stuka.png',
  },
  {
    title: 'Fundación garras y patas',
    paragraphs: [
      'En la Fundación Garras y Patas somos un grupo de personas unidas por la sensibilidad hacia el problema de la sobrepoblación de mascotas abandonadas, contamos con un Directorio que dirige la Fundación, líderes que coordinan las diversas actividades que se realizan y voluntarios activos todos trabajamos gratis y en nuestro tiempo libre.',
      'La Fundación se dedica al rescate, recuperación, readaptación y posterior reinserción en nuevos hogares, de perros y gatos abandonados y a la recaudación de fondos para estos fines. Contamos actualmente con voluntarios activos, socios aportantes de dinero, variados auspiciadores y gran presencia en las redes sociales.',
      'Esto ha generado un gran contacto con la comunidad, cuyos miembros nos escriben en forma constante solicitando ayuda y consejos, con lo cual cumplimos además un rol educativo en la tenencia responsable de mascotas, la necesidad de esterilización y educación de las mismas.',      
    ],
    url: 'http://www.garrasypatas.cl/',
    email: 'contacto@garrasypatas.cl',
    image: 'garras_y_patas.png',
  },
  {
    title: 'Fundación Chile Mestizo',
    paragraphs: [
      'Fundación Chile Mestizo es una agrupación formada por personas preocupadas del bienestar animal, especialmente de perros, con años de experiencia en rescate, rehabilitación y adopción.',
      'Nuestra misión es rescatar animales en situación de riesgo y abandono, especialmente perros discapacitados que les es imposible sobrevivir en la calle, esterilizarlos, rehabilitarlos e incorporarlos a familias definitivas.',
      ' Otra área importante de nuestra gestión es dar la oportunidad de tener un final digno a perros ancianos terminales abandonados en un hogar de acogida con todos los cuidados requeridos según su condición.',
    ],
    url: 'http://www.chilemestizo.cl/',
    email: 'chilemestizo@gmail.com',
    image: 'chile_mestizo.jpg',
  },
  {
    title: 'Corporación Mirada Animal',
    paragraphs: [
      'Mirada Animal Chile es una corporación que nace en 2014 destinada a trabajar por el bienestar animal y promover el respeto y la tenencia responsable de animales de compañia, especialmente en condición de abandono, rescatando y mejorando las condiciones sanitarias, educando y generando conciencia en la población.',
      'El equipo de Mirada Animal Chile está conformado por un directorio y líderes en distintas áreas relacionadas con el quehacer de la Corporación.',
      'Asimismo, hay detrás de este equipo, un valioso y fundamental grupo de voluntarios y voluntarias.',
      'En nuestro refugio (Refugio Esperanza), ubicado en la comuna de Padre Hurtado, albergamos a más de 120 perritos de distintos tamaños, edades y características.',
      'Nuestra meta final es que cada uno de ellos encuentre una familia definitiva, cerrando así el ciclo al construir para ellos un futuro lleno de amor y cuidados de por vida.',
      'Para llevar a cabo nuestra obra, y asegurar los recursos necesarios, generamos diversas actividades, participamos en jornadas de adopción y buscamos el apoyo de socios colaboradores, padrinos y voluntarios.',
    ],
    url: 'http://www.miradaanimal.cl',
    email: 'miradaanimalchile@gmail.com',
    image: 'mirada_animal.png',
  },
  {
    title: 'Fundación Unión de Amigos de los Animales',
    paragraphs: [
      'La UAA ( Unión de Amigos de los Animales ) desde 1955 que trabaja por la educación, rescate y rehabilitación de animales en situación de vulnerabilidad.',
      'Creemos que la única forma de solucionar el problema del abandono y maltrato animal, es a través de la esterilización y la educación de la comunidad.',
      'Nuestro refugio mantiene 200 mascotas entre perros y gatos.',
    ],
    url: 'http://www.uaa.cl/',
    email: 'adopciones@uaa.cl',
    image: 'union_de_amigos_de_los_animales.jpg',
  },
  {
    title: 'Fundación Ayudando Peluditos Chile',
    paragraphs: [
      'Ayudando Peluditos Chile es una agrupación sin fines de lucro creada el año 2013 constituida por 9 integrantes, cuya finalidad es el rescate de animales en situación de riesgo, su tratamiento y la reinserción en nuevas familias.',
      'Esta inquietud surgió con el fin de poder contribuir a satisfacer la necesidad de los callejeros, la cual es inmensa; abandono, hambre, enfermedades, malos tratos de personas y una gran falta de cultura hacia el cuidado animal.',
      'En los años que lleva en pie este hermoso proyectos hemos podido ayudar a 100 perritos y 70 gatitos, que han encontrado familias definitivas.',
      'Actualmente tenemos perritos y gatitos que esperan encontrar un hogar y que se encuentran en hogares temporales pagados.',
      'Para poder seguir ayudando y solventando los gastos de mantención de estos Peluditos, necesitamos de la ayuda de todos ya sea haciéndose socio de la agrupación, apoyando casos individuales o siendo voluntario.',
    ],
    url: 'https://www.facebook.com/AyudandoPeluditosChile/',
    email: 'monseguajardo@gmail.com',
    image: 'ayudando_peluditos_chile.jpg',
  },
  {
    title: 'Patitas Cansadas',
    paragraphs: [
      'PCAA Patitas Cansadas Ayuda Animal, nace desde el amor y el respeto de un grupo de personas hacia los animales no humanos.',
      'Nos une la convicción de ayudar a cambiar el destino de aquellos que han vivido situaciones de maltrato, abandono, enfermedad o discriminación.',
      'Existen miles de ellos en las calles tratando de sobrevivir: mestizos, de razas, cachorros, adultos, ancianos.',
      'Hemos asumido la labor de rescatarlos, cubrir sus necesidades de salud, alimentación y rehabilitación para posteriormente reubicarlos con familias responsables y comprometidas a brindarles una segunda oportunidad como miembro de su grupo familiar.',
      'Anhelamos contribuir a despertar en la comunidad el interés por conocer este mundo y que consideren la posibilidad de Adoptar dando un mágico giro a sus vidas.',
    ],
    url: 'http://www.patitascansadas.cl/',
    email: 'pcaa.adopciones@gmail.com',
    image: 'patitas_cansadas.jpg',
  },
  {
    title: 'Agrupación Perritos de Rinconada de Maipú',
    paragraphs: [
      'Perritos de Rinconada, es una agrupación sin fines de lucro dedicada al rescate, rehabilitación, esterilización y adopción de perritos y gatitos en situación de abandono en un sector rural de la comuna de Maipú, en donde los perritos viven solos, pero en comunidad.',
      'La alimentación y los cuidados de los perritos está a cargo de voluntarios, a los cuales llamamos "Tíos" que se preocupan de asistirlos semanalmente, llevarles casas y mantas para el frio, desparasitarlos y curar enfermedades.',
      'Esta labor no sería posible sin los aportes que nos hacen llegar distintas personas que se han conmovido con nuestra labor, lamentablemente no es permanente, por lo que la difusión de nuestro propósito es fundamental.',
      'Perritos de Rinconada al no ser un refugio, sino un sitio eriazo donde los perritos llegan por distintos motivos, la pronta adopción pasa a tomar un rol primordial buscando, de esta manera, darles una oportunidad de experimentar el amor de hogar.',
      'Nos preocupamos de hacer seguimiento a cada una de las adopciones, velando por el cuidado de cada uno de los perritos.',
      'Junto con adoptar, tenemos la tarea de educar y crear conciencia sobre la tenencia responsable, aportando nuestra pequeña semilla contra el abandono y maltrato animal.',
    ],
    url: 'https://www.facebook.com/Agrupacion-Perritos-De-Rinconada-Maipu-577780325611244/',
    email: 'adoptaperritosderinconada@gmail.com',
    image: 'perritos_de_rinconada.jpg',
  },
  {
    title: 'Fundación Adopta un Amigo Osorno',
    paragraphs: [
      'Agrupación sin fines de lucro, fundada el 08 de noviembre de 2014 en la Ciudad de Osorno, con Personalidad Jurídica Municipal F-3436. Nuestra organización nace de la preocupación y necesidad de frenar el abandono, maltrato e indiferencia hacia los animales, principalmente perros y gatos.',
      'Se ha convertido en nuestra misión promover el respeto y bienestar animal, asimismo soñamos que llegará un día en que ya no será necesario de nuestra ayuda porque todos seremos parte de este cambio.',
      'Entre nuestras actividades destaca rescate y rehabilitación animal, Jornadas de adopción, seguimiento a los rescatados, incentivo a la esterilización como método para acabar con el abandono, educación en tenencia de mascotas, postulación a fondos concursales, difusión de nuestras actividades y casos en redes sociales, búsqueda de colaboradores y socios, además de actividades de financiamiento.',
      'Nuestra meta es que no existan animales abandonados, buscamos que cada rescatado tenga un hogar temporal o en el mejor de los casos un hogar definitivo para pasar el resto de su vida.',
      'Una mascota es un eterno compañero que será parte de nuestras vidas, ellos necesitan conocer el amor en familia y que los protejan, entreguemos un hogar a estos rescatados.',
    ],
    url: 'https://www.facebook.com/groups/adoptaunamigoosorno/',
    email: '',
    image: 'adopta_un_amigo_osorno.jpg',
  }
];
</script>

<template>
  <div class="organizations">
    <div v-for="organization of organizations" class="item">
      <img :src="`images/organizations/${organization.image}`" class="card-img-top" alt="">
      <div class="content">
        <h4>{{ organization.title }}</h4>
        <p v-for="paragraph of organization.paragraphs">{{ paragraph }}</p>
        <div class="btn-group" role="group">
          <a :href="organization.url" target="_blank" class="btn btn-primary">Ir al sitio</a>
          <a v-if="organization.email" :href="`mailto:${organization.email}`" target="_blank" class="btn btn-info">{{ organization.email }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .organizations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;

    padding: 1rem;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      gap: 20px;

      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .content {
        width: 100%;
      }
    }
  }
</style>