// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
var config = {
  plugins: [
    sveltekit()
  ],
  build: {
    sourcemap: true
  },
  css: {
    devSourcemap: true
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeVByb2plY3RzXFxcXEpTXFxcXFNWRUxURUtJVFxcXFx0d2l0dHJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE15UHJvamVjdHNcXFxcSlNcXFxcU1ZFTFRFS0lUXFxcXHR3aXR0clxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTXlQcm9qZWN0cy9KUy9TVkVMVEVLSVQvdHdpdHRyL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJ3ZpdGUnKS5Vc2VyQ29uZmlnfSAqL1xuY29uc3QgY29uZmlnID0ge1xuXHRwbHVnaW5zOiBbXG5cdFx0c3ZlbHRla2l0KClcblx0XSxcblx0YnVpbGQ6IHtcbiAgICAgICAgXHRzb3VyY2VtYXA6IHRydWUsXG5cdH0sXG4gIFx0Y3NzOiB7XG4gICAgXHRcdGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStSLFNBQVMsaUJBQWlCO0FBR3pULElBQU0sU0FBUztBQUFBLEVBQ2QsU0FBUztBQUFBLElBQ1IsVUFBVTtBQUFBLEVBQ1g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNDLFdBQVc7QUFBQSxFQUNuQjtBQUFBLEVBQ0UsS0FBSztBQUFBLElBQ0YsY0FBYztBQUFBLEVBQ2pCO0FBQ0g7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=