const service = {
  /**
   * return { allow, failPath }
   */
  validateRoute(route) {
    // TODO: check

    // TODO: check route.permissions isNull => yes all alow

    // TODO: get localStorage token

    // TODO: no have token => logout(clear localStorage)
    // TODO: have token => token-login ( fail => logout(clear localStorage) )

    // TODO: check route and permissions

    // TODO: 暫時為了測試用
    if (route.path === '/profile') {
      return {
        allow: false,
        failPath: '/login',
      };
    }

    return {
      allow: true,
      failPath: null,
    };
  },
};

export default service;
