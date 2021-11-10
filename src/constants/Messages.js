const CodeError = require("../CodeError");

module.exports = {
	INDEX: {
		ERR: {
			CONNECTION: Error("Error de conexion en la base de datos: ")
		},
		MSG: {
			CONNECTING: "conectandose a: ",
			CONNECTED: "Base de datos conectada.",
			HELLO_WORLD: "Hola DIDI!",
			RUNNING_ON: "Ejecutandose en puerto ",
			STARTING_WORKER: "Arrancando nuevo worker",
			STARTING_WORKERS: num => `Inicializando ${num} workers`,
			STARTED_WORKER: pid => `Worker ${pid} inicializado`,
			ENDED_WORKER: (pid, code, signal) => `Worker ${pid} termino con codigo: ${code}, y señal: ${signal}`
		}
	},
	REGISTER: {
		ERR: {
			CREATE: new CodeError({ code: "REGISTER_CREATE", message: "El registro no pudo ser creado." }),
			NOT_EXIST: new CodeError({ code: "NOT_EXIST", message: "El registro no existe" }),
			EDIT: new CodeError({
				code: "REGISTER_EDIT",
				message: "El modelo de registro no pudo ser editado. Verifique que el registro haya sido creado con éxito."
			}),
			BLOCKCHAIN: new CodeError({ code: "NOT_EXIST_BLOCKCHAIN", message: "No existe la blockchain elegida." }),
			GET: new CodeError({ code: "REGISTER_GET", message: "El registro no pudo ser obtenido." }),
			DID_EXISTS: new CodeError({ code: "DID_EXISTS", message: "Ya existe un registro con ese did." }),
			STATUS: new CodeError({ code: "STATUS", message: "El status no existe" }),
			RETRY: new CodeError({ code: "RETRY", message: "Hubo un error al intentar validar el registro." }),
			INVALID_STATUS: new CodeError({
				code: "INVALID_STATUS",
				message: "No se puede realizar esta acción con el estado actual del registro."
			}),
			NOT_BLOCKCHAIN: new CodeError({
				code: "NOT_BLOCKCHAIN",
				message:
					"Error al emitir la credencial. El template que utiliza la credencial NO tiene una blockchain asignada. Por favor, configure la blockchain de verificación en el template."
			}),
			STATUS_NOT_VALID: new CodeError({
				code: "STATUS_NOT_VALID",
				message: "No se puede realizar esta accion, debido al estado del registro."
			}),
			REFRESH: new CodeError({
				code: "REGISTER_REFRESH",
				message: "No se pudo actualizar el registro."
			}),
			NAME_EXIST: new CodeError({
				code: "NAME_EXIST",
				message: "Ya existe el nombre para la misma blockchain."
			}),
			INVALID_DID: new CodeError({
				code: "INVALID_DID",
				message: "El did es inválido."
			}),
			INVALID_PRIVATE_KEY: new CodeError({
				code: "INVALID_PRIVATE_KEY",
				message: "La clave privada es inválida."
			}),
			INVALID_DID_AND_KEY: new CodeError({
				code: "INVALID_DID_AND_KEY",
				message: "Hubo un error al validar el did y la clave privada."
			})
		}
	},
	DELEGATE: {
		ERR: {
			NOT_EXIST: new CodeError({ code: "NOT_EXIST", message: "El delegado no existe." }),
			SET_NAME: new CodeError({ code: "SET_NAME", message: "No se pudo actualizar el nombre del emisor." }),
			GET_NAME: new CodeError({ code: "GET_NAME", message: "No se pudo obtener el nombre del emisor." }),
			DELEGATE: new CodeError({
				code: "DELEGATE",
				message:
					"No se pudo realizar la delegación. Por favor, compruebe que el DID emisor tiene tokens disponibles para ejecutar la transacción en la blockchain"
			}),
			CREATE: new CodeError({ code: "DELEGATE_CREATE", message: "El delegado no pudo ser creado." }),
			GET: new CodeError({ code: "DELEGATE_GET", message: "El delegado no pudo ser obtenido." }),
			DELETE: new CodeError({ code: "DELEGATE_DELETE", message: "El delegado no pudo ser borrado." })
		}
	},
	PROFILE: {
		ERR: {
			GET: new CodeError({ code: "PROFILE_GET", message: "No se encontro el Perfil." }),
			NAME_NOT_UNIQUE: new CodeError({ code: "NAME_NOT_UNIQUE", message: "El nombre del perfil ya existe." }),
			IS_USED: new CodeError({
				code: "PROFILE_IS_USED",
				message: "El perfil que se desea borrar lo estan usando los siguientes usuarios: "
			})
		}
	},
	USER: {
		ERR: {
			INVALID_USER: new CodeError({ code: "INVALID_USER", message: "El usuario y contraseña no coinciden." }),
			CREATE: new CodeError({ code: "USER_CREATE", message: "El usuario no pudo ser creado." }),
			GET: new CodeError({ code: "USER_GET", message: "El usuario no pudo ser obtenido." }),
			SET_NAME: new CodeError({ code: "DELEGATE_SET_NAME", message: "El delegado no pudo ser verificado." }),
			GET_NAME: new CodeError({ code: "DELEGATE_GET_NAME", message: "El nombre del emisor no pudo ser obtenido." }),
			UNIQUE_NAME: new CodeError({ code: "UNIQUE_NAME", message: "El nombre del usuario ya existe." }),
			TYPE: new CodeError({ code: "INVALID_TYPE", message: "El tipo elegido para el usuario no es valido." }),
			DELETE: new CodeError({ code: "USER_DELETE", message: "El modelo de usuario no pudo ser borrado." }),
			EDIT: new CodeError({ code: "USER_EDIT", message: "El modelo de usuario no pudo ser editado." })
		}
	},
	CERT: {
		ERR: {
			EMMIT: new CodeError({ code: "CERT_EMMIT", message: "El certificado no pudo ser emitido." }),
			CREATE: new CodeError({ code: "CERT_CREATE", message: "El certificado no pudo ser creado." }),
			GET: new CodeError({ code: "CERT_GET", message: "El certificado no pudo ser obtenido." }),
			EDIT: new CodeError({ code: "CERT_EDIT", message: "El certificado no pudo ser modificado." }),
			DELETE: new CodeError({ code: "CERT_DELETE", message: "El certificado no pudo ser borrado." }),
			REVOKE: new CodeError({ code: "CERT_REVOKE", message: "El certificado no pudo ser revocado." })
		}
	},
	PARTICIPANT: {
		ERR: {
			CREATE: new CodeError({ code: "PARTICIPANT_CREATE", message: "El modelo de participante no pudo ser creado." }),
			GET: new CodeError({ code: "PARTICIPANT_GET", message: "El modelo de participante no pudo ser obtenido." }),
			EDIT: new CodeError({ code: "PARTICIPANT_EDIT", message: "El modelo de participante no pudo ser modificado." }),
			DELETE: new CodeError({ code: "PARTICIPANT_DELETE", message: "El modelo de participante no pudo ser borrado." })
		}
	},
	SHARE_REQ: {
		ERR: {
			CREATE: new CodeError({ code: "SHARE_REQ_CREATE", message: "El pedido de certificados no pudo ser creado." }),
			SEND: new CodeError({ code: "SHARE_REQ_SEND", message: "El pedido de certificados no pudo ser enviado." })
		}
	},
	TEMPLATE: {
		ERR: {
			CREATE: new CodeError({ code: "TEMPLATE_CREATE", message: "El modelo de certificado no pudo ser creado." }),
			GET: new CodeError({ code: "TEMPLATE_GET", message: "El modelo de certificado no pudo ser obtenido." }),
			EDIT: new CodeError({ code: "TEMPLATE_EDIT", message: "El modelo de certificado no pudo ser modificado." }),
			DELETE: new CodeError({ code: "TEMPLATE_DELETE", message: "El modelo de certificado no pudo ser borrado." }),
			UNIQUE_NAME: new CodeError({
				code: "UNIQUE_NAME",
				message:
					"Error al Crear el Template: El nombre elegido ya existe. Por favor, vuelva a intentarlo con un nombre diferente."
			})
		}
	},
	CERTIFICATE: {
		CREATED: "Certificado creado",
		VERIFIED: "Certificado verificado",
		SAVED: "Certificado guardado",
		ERR: {
			VERIFY: new CodeError({ code: "CERT_VERIFY_ERROR", message: "Error al validar la credencial." })
		},
		CERT_FIELDS: {
			NAME: "CREDENCIAL",
			PARTICIPANT_NAME: "NOMBRE",
			PARTICIPANT_LAST_NAME: "APELLIDO"
		}
	},
	VALIDATION: {
		INVALID_TOKEN: new CodeError({ code: "INVALID_TOKEN", message: "Token invalido." }),
		ROLES: { code: "PERMISSION_DENIED", message: "Esta operacion requiere privilegios que no tienes." },
		TEMPLATE_DATA_TYPE: {
			INVALID_DATA_TYPE(data) {
				return { code: "INVALID_DATA_TYPE", message: `${data} no es una sección válida del certificado.` };
			}
		},
		TEMPLATE_DATA_VALUE: {
			INVALID_DATA_VALUE(type) {
				return {
					code: "INVALID_DATA_VALUE",
					message: `el campo ${type} contiene un valor invalido.`
				};
			}
		},
		TEMPLATE_DATA: {
			INVALID_TEMPLATE_PREVIEW_TYPE: {
				code: "INVALID_TEMPLATE_PREVIEW_TYPE",
				message: "Se permiten actualmente solo 2, 4 o 6 campos para previsualizar."
			},
			INVALID_TEMPLATE_ID: { code: "INVALID_TEMPLATE_ID", message: "No existe modelo de certificado con ese id." },
			INVALID_TEMPLATE_PREVIEW_DATA: {
				code: "INVALID_TEMPLATE_PREVIEW_DATA",
				message: "El modelo de certificado no contiene los tipos requeridos."
			},
			NO_DATA(type) {
				return { code: "NO_DATA", message: `El campo ${type} no contiene datos.` };
			},
			INVALID_DATA(type) {
				return { code: "INVALID_DATA", message: `El campo ${type} tiene un formato invalido.` };
			},
			INVALID_TYPE(type) {
				return { code: "INVALID_TYPE", message: `El campo ${type} tiene un tipo de dato invalido.` };
			},
			MISSING_CHECKBOX_OPTIONS(type) {
				return {
					code: "MISSING_CHECKBOX_OPTIONS",
					message: `El campo ${type} es de tipo 'checkbox' pero falta el campo 'options'.`
				};
			}
		},
		CERT_DATA: {
			INVALID_MICROCRED_DATA(name) {
				return new CodeError({
					code: "INVALID_MICROCRED_DATA",
					message: `El campo ${name} no puede ser parte de una microcredencial, no se encuentra en el certificado.`
				});
			},
			INVALID_TEMPLATE_ID(type) {
				return new CodeError({ code: "INVALID_TEMPLATE_ID", message: `El campo ${type} es inválido.` });
			},
			EXTRA_ELEMENT(name) {
				return new CodeError({
					code: "EXTRA_ELEMENT",
					message: `El campo ${name} no se encuentra en el modelo de certificado.`
				});
			},
			MISSING_ELEMENT(name) {
				return new CodeError({
					code: "MISSING_ELEMENT",
					message: `El campo ${name} está faltando en el certificado.`
				});
			}
		},
		REQUESTER_IS: user => `El token le pertenece a: ${user.name}`,
		COMMON_PASSWORD: new CodeError({
			code: "COMMON_PASSWORD",
			message: "La contraseña ingresada es de uso común, por favor ingrese una mas segura."
		}),
		DOES_NOT_EXIST(type) {
			return new CodeError({ code: "PARAMETER_MISSING", message: `Falta el campo: ${type}` });
		},
		STRING_FORMAT_INVALID(field) {
			return new CodeError({
				code: "PARAMETER_TYPE_ERROR",
				message: `El campo ${field} es incorrecto, se esperaba un texto.`
			});
		},
		LENGTH_INVALID(field, min, max) {
			const code = "PARAMETER_TYPE_ERROR";
			const msgStart = `El campo ${field} tendria que tener.`;

			if (min && !max) {
				return new CodeError({
					code,
					message: `${msgStart} mas que ${min} caracteres.`
				});
			}

			if (!min && max) {
				return new CodeError({
					code,
					message: `${msgStart} menos que ${max} caracteres.`
				});
			}

			if (min === max) {
				return new CodeError({
					code,
					message: `${msgStart} exactamente ${max} caracteres.`
				});
			}
			return new CodeError({
				code,
				message: `${msgStart} entre ${min} y ${max} caracteres.`
			});
		}
	}
};