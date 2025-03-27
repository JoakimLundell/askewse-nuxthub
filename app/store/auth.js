import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    openLogin: false,
    openRegister: false,
    openUser: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async register(name, email, password) {
      this.loading = true;
      $fetch("/api/auth/register", {
        method: "POST",
        body: {
          name,
          email,
          password,
        },
      })
        .then((response) => {
          this.token = response.token;
          this.user = response.user;
          this.openRegister = false;
          this.toastSuccess(response);
        })
        .catch((error) => {
          console.dir(error);
          this.toastError(error.statusMessage);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async login(email, password) {
      this.loading = true;
      $fetch("/api/auth/login", {
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      })
        .then((response) => {
          this.token = response.token;
          this.user = response.user;
          this.openLogin = false;
        })
        .catch((error) => {
          console.dir(error.statusMessage);
          this.toastError(error.statusMessage);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async logout() {
      $fetch("/api/auth/logout", {
        method: "DELETE",
      })
        .then((response) => {
          //navigateTo("/")
          //this.switchMarkerOnLogout();
          this.token = null;
          this.user = null;
        })
        .catch((error) => {
          console.error(error);
          //errors.value = error?.statusMessage || "Signup failed";
          this.forceLogout();
        })
        .finally(() => {
          this.toastSuccess("You where succesfully logged out.");
          this.openUser = false;
        });
    },

    forceLogout() {
      const token = useCookie("askew_token");
      token.value = null;
      this.token = null;
      this.user = null;
    },

    switchMarkerOnLogout() {},

    async checkMe() {
      this.loading = true;
      console.log("Running checkMe");
      this.token = useCookie("askew_token");
      if (this.token)
        $fetch("/api/auth/me", {
          method: "GET",
        })
          .then((response) => {
            this.user = response.user;
            //navigateTo("/");
          })
          .catch((error) => {
            console.error(error);
            this.toastError(error);
            //errors.value = error?.statusMessage || "Signup failed";
            //navigateTo("/login");
            //const snackbar = useSnackbarStore();
            //snackbar.info("Your session expired | You where logged out.");
            //this.forceLogout();
          });
      else console.log("setting guest");
      this.loading = false;
    },

    // Initialize auth state from localStorage
    async init() {
      this.checkMe();
    },

    toastError(message) {
      const toast = useToast();
      toast.add({
        title: "Error",
        description: message,
        color: "error",
      });
    },
    toastSuccess(message) {
      const toast = useToast();
      toast.add({
        title: "Success",
        description: message,
        color: "success",
      });
    },

    toggleOpenLogin() {
      this.openLogin = !this.openLogin;
    },
    toggleOpenRegister() {
      this.openRegister = !this.openRegister;
    },
    toggleOpenUser() {
      this.openUser = !this.openUser;
    },
  },
});
