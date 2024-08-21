<template>
  <div ref="mapElement" class="relative mx-auto w-full min-w-[100px] flex justify-center items-center rounded-xl"
    :class="class">
    <ClientOnly v-if="show && mapVisible">
      <LMap ref="mapRef" :zoom="zoom" class="rounded-xl sticky !bg-[#d6e8eb] dark:!bg-[#262625]"
        :useGlobalLeaflet="true" @ready="mapInitialized" :worldCopyJump="false" :options="mapOptions">
        <LGeoJson v-if="!marker" ref="geoJsonRef" :geojson="geojsonData" :options="geojsonOptions"
          :options-style="styleFeature" @ready="geoJsonInitialized" />
        <LTileLayer v-if="tileReady" :url="tileLayer" :attribution="attribution" layer-type="base" name="OpenStreetMap"
          :detectRetina="true" />
        <div v-show="false">
          <UIcon name="i-heroicons-arrows-pointing-out-20-solid" />
          <UIcon name="i-heroicons-plus-20-solid" />
          <UIcon name="i-heroicons-minus-20-solid" />
        </div>
      </LMap>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import colors from '#tailwind-config/theme/colors'
const colorMode = useColorMode()

const props = defineProps({
  countryCode: {
    type: String,
    default: ''
  },
  marker: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'amber'
  },
  class: {
    type: String,
    default: 'h-[300px]'
  }
})

let map: any, geojson: any, leaflet: any = null
let markerIcon: any, marker: any
const mapElement = ref(null)
const mapVisible = ref(false)
const mapRef = ref(null)
const geoJsonRef = ref(null)
const show = ref(false)
const layerReady = ref(false)
const geojsonData = ref<any>(null)
const tileReady = ref(true)
const zoom = ref<number>(props.marker ? 3 : 2)
const attribution = ''
const defaultCenter = [30, 10]
const markerCenter = [-34.000162, 150.750186]

const darkMode = computed(() => colorMode.value === 'dark')
const tileLayer = computed(() => {
  const path = !darkMode.value ? 'rastertiles/voyager' : 'dark_all'
  return `https://{s}.basemaps.cartocdn.com/${path}/{z}/{x}/{y}{r}.png`
})

const mapOptions = {
  attributionControl: false,
  zoomControl: false
}

const geojsonOptions = {
  style: styleFeature
}

const countriesGeoJson = ref(null)
const position = computed(() => 'topright')

const iconPathPrefixer = '/img/map/'

const mapReady = computed(() => {
  return layerReady.value
})

async function loadMap() {
  show.value = true
}

onMounted(async () => {
  loadMap()
  initObserver()
})

watch(() => countriesGeoJson.value, async () => {
  await addLayerData()
})

watch(() => colorMode.value, async () => {
  await redrawMap()
  await resetMap()
})

async function mapInitialized() {
  if (!mapRef || !mapRef.value) {
    return
  }
  leaflet = await import('leaflet')
  if (!leaflet) {
    return
  }
  map = (mapRef.value as any)?.leafletObject
  if (!map) {
    return
  }
  map.setView(defaultCenter, zoom.value)
  if (!props.marker) {
    map.setMinZoom(zoom.value)
    // map.options.zoomSnap = 0.1
    // map.options.zoomDelta = 0.5
  }

  class CustomControl extends leaflet.Control {
    constructor(options = {}) {
      super(options)
    }

    onAdd(map: any) {
      const controlName = `leaflet-control-${this.options.controlType}`
      const container = leaflet.DomUtil.create('div', `${controlName} w-8 h-8 bg-gray-50 dark:bg-gray-900 hover:bg-primary-10 dark:hover:bg-primary-900 rounded-full shadow-2xl flex flex-col items-center`)
      const buttonText = `<span class="${this.options.icon} mt-1.5 text-lg text-black dark:text-white hover:text-primary dark:hover:text-primary" />`
      this.button = this._createButton(buttonText, this.options.title, controlName, container, this.options.onClick)
      return container
    }

    _createButton(html: any, title: any, className: any, container: any, fn: any) {
      const link = leaflet.DomUtil.create('a', className, container)
      link.innerHTML = html
      link.href = '#'
      link.title = title
      link.role = 'button'
      leaflet.DomEvent.on(link, 'click', leaflet.DomEvent.stop).on(link, 'click', fn, this)
      return link
    }
  }

  leaflet.control.home = (opts: any) => new CustomControl({
    ...opts, controlType: 'home', icon: 'i-heroicons:arrows-pointing-out-20-solid', title: 'Home', onClick: () => {
      centerMap()
    }
  })

  leaflet.control.zoomin = (opts: any) => new CustomControl({
    ...opts, controlType: 'zoomin', icon: 'i-heroicons:plus-20-solid', title: 'ZoomIn', onClick: () => {
      map.zoomIn()
    }
  })


  leaflet.control.zoomout = (opts: any) => new CustomControl({
    ...opts, controlType: 'zoomout', icon: 'i-heroicons:minus-20-solid', title: 'ZoomOut', onClick: () => {
      map.zoomOut()
    }
  })

  leaflet.control.zoomin({ position: position.value }).addTo(map)
  leaflet.control.zoomout({ position: position.value }).addTo(map)
  leaflet.control.home({ position: position.value }).addTo(map)

  addLayerData()
}

async function geoJsonInitialized() {
  geojson = (geoJsonRef.value as any).leafletObject
  await centerBounds()
}

async function redrawMap() {
  if (!map) {
    return
  }
  tileReady.value = false
  setTimeout(async () => {
    map.invalidateSize(true)
    tileReady.value = true
  }, 100)
}

async function resetMap() {
  if (geojson) {
    geojson.resetStyle()
  }
  if (props.marker) {
    addMarkerData()
  }
}

async function addLayerData() {
  if (!map) {
    return
  }
  if (props.marker) {
    addMarkerData()
  } else {
    addGeoJsonData()
  }
  centerMap()
}

async function addGeoJsonData() {
  if (!countriesGeoJson.value) {
    return
  }
  geojsonData.value = JSON.parse(countriesGeoJson.value)
  setTimeout(async () => {
    layerReady.value = true
  }, 100)
}

async function addMarkerData() {
  markerIcon = leaflet.icon({
    iconUrl: iconPathPrefixer + 'marker-icon.png',
    shadowUrl: iconPathPrefixer + 'marker-shadow.png',
    iconRetinaUrl: iconPathPrefixer + 'marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
  marker = leaflet.marker(markerCenter, { icon: markerIcon }).addTo(map)
  setTimeout(async () => {
    layerReady.value = true
  }, 100)
}

async function centerMap() {
  if (props.marker) {
    await centerMarker()
  } else {
    await centerBounds()
  }
}

async function centerMarker() {
  if (!map) {
    return
  }
  map.flyTo(markerCenter, zoom.value)
  if (marker) {
    var group = new leaflet.featureGroup([marker])
    const bounds = group.getBounds()
    setBounds(bounds)
  }
}

async function centerBounds() {
  if (!map || !geojson) {
    return
  }
  await nextTick()
  const bounds = geojson.getBounds()
  if (!bounds.isValid()) {
    console.log('Invalid bounds')
    return
  }
  map.flyToBounds(bounds, {
    padding: [80, 80]
  })
  setBounds(bounds)
}

async function setBounds(bounds: any) {
  if (!map) {
    return
  }
  if (!bounds.isValid()) {
    console.log('Invalid bounds')
    return
  }
  map.options.maxBounds = bounds
}

function styleFeature(feature: any) {
  const countryFillColor = colors[props.color]?.[500]
  return {
    fillColor: countryFillColor,
    stroke: true,
    color: countryFillColor,
    dashArray: '3'
  }
}

const initObserver = async () => {
  const { useIntersectionObserver } = await import('@vueuse/core')
  if (!mapElement.value) return

  const options = {
    root: null, // observing with respect to the viewport
    rootMargin: '0px 0px 0px 0px', // margin around the root
    threshold: 0.1 // trigger when 100% of the element is visible
  }
  const observer = useIntersectionObserver(mapElement, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      mapVisible.value = true
      observer.stop()
    }
  }, options)
}
</script>