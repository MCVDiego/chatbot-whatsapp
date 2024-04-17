const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['Hola','hola', 'Que tal', 'buenos','buenas','Buenos','Buenas']
)
    .addAnswer(['🙌 Hola, bienvendio al *SOS*, Sistema Optimizado de Soporte, de la unidad de informática',
            'En este momento se encuentra abierto el sistema de ayuda',
            'Nuestro horario de atención es de:',
            'Lunes a Viernes = *9:00 a 18:00 hrs.*',
            'Sábado y Domingo = *No activo*'])
    .addAnswer([    
    'Gracias por comunicarte con la Unidad de Informática, porfavor coloque su nombre y escriba brevemente un problema a tratar',
    '>Ticket Firmado.',
    '>Oficio Firmado.',
    '>Problemas de Red.',
    '>No imprime.',
    '>Escaneo no Llega.',
    '>No Enciende.',
    '>Teclado no Funciona.',
    '>Distorsión Imagen.'
        ])
    

const flowTicket = addKeyword(['Ticket','ticket'])
      .addAnswer(['>Para esta incidencia se requiere generar en el sistema S.O.S. un ticket de atención, deberá ser impreso y firmado por el jefe inmediato superior, una vez firmado, entregar a la Unidad de Informática y a la brevedad uno de nuestros compañeros se pondrá en contacto con usted para más detalles.'
])

const flowOficio = addKeyword(['Oficio','oficio'])
      .addAnswer(['>Para esta incidencia se requiere generar un oficio firmado por el jefe inmediato superior, una vez firmado, entregar a la Unidad de Informática y a la brevedad uno de nuestros compañeros se pondrá en contacto con usted para más detalles.'  
    ])

const flowRed = addKeyword(['Problemas de red', 'Problemas de Red', 'Problemas De Red'])
      .addAnswer(['1.-Revisar el cable de red (Quitar y colocar.)',
      '2.-*CARPETAS COMPARTIDAS:* Oprime ctrl+alt+sup y seleccione la opción cambiar una contraseña, y digite una nueva contraseña, y a continuación confirme y de click en ➜.',
      '3.-En caso de NO haber resuelto el problema, por favor escriba la palabra *Genera ticket*.'
      ])

const flowImprime = addKeyword(['No imprime', 'No Imprime'])
     .addAnswer(['1.-Revisar que se encuentre encendida la impresora, que contenga hojas y tóner.',
        '2.-*IMPRESORA LOCAL:* Revisar que el cable USB de la impresora se encuentre conectado al equipo.',
        '3.-*IMPRESORA COMPARTIDA:* Revisar el cable de red (Quitarlo y volver a colocarlo).',
        '4.-En caso de NO haber resuelto el problema, por favor escriba la palabra *Genera ticket*.'
     ])

const flowEscaneo = addKeyword(['Escaneo no llega', 'Escaneo No llega', 'Escaneo No Llega', 'escaneo', 'Escaneo'])
     .addAnswer(['1.-Verificar que esté seleccionada la carpeta del usuario correctamente.',
    '2.-En caso de NO haber resuelto el problema, por favor escriba la palabra *Genera ticket*. '
    ])

const flowEnciende = addKeyword('No enciende', 'No Enciende')
    .addAnswer(['1.-Revisar el cable de corriente (Quitar y colocar.',
    '2.-Revisar que se encuentre encendido el no break o multicontacto.',
    '3.-Esta conectado a un multicontacto? Verificar que tenga corriente, este encendido o cambie de contacto.',
    '4.-En caso de NO haber resuelto el problema, por favor escriba la palabra *Genera ticket*.'
    ])

const flowTeclado = addKeyword('Teclado no funciona', 'Teclado No funciona', 'Teclado no Funciona', 'Teclado')
     .addAnswer(['1.-Revisar conexión USB a CPU (Quitar y colocar).',
     '2.-Conectar a otro puerto USB',
     '3.-En caso de NO haber resuelto el problema, por favor escriba la palabra *Genera ticket*. '
     ])

const flowDistorsion = addKeyword(['Distorsión Imagen', 'Distorsión imagen', 'Distorsión'])
     .addAnswer(['1.-Revisar que se encuentre bien conectado el cable de señal del monitor al CPU',
     'En caso de NO haber resuelto el problema, por favor escriba la palabra *Genera ticket*.'
     ])

const flowGenera = addKeyword(['Genera Ticket', 'Genera ticket', 'Genera '])
     .addAnswer(['Muchas gracias por contactarnos!',
     'En breve se generará en el sistema S.O.S. un Ticket de atención y uno de nuestros compañeros de la Unidad de Informática se pondrá en contacto para más detalles.'
     ])

const flowGracias = addKeyword('Gracias')
     .addAnswer('Gracias por contactarnos, su Ticket ya ha sido atendido!')

const flowBotones = addKeyword(['Genera Ticket', 'Genera ticket', 'Genera '])
     .addAnswer ({
         buttons: [
            {
             body: 'Gracias'   
            }
         ] 
     })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowTicket, flowOficio, flowRed, flowImprime, flowEscaneo, flowEnciende, flowTeclado, flowDistorsion, flowGenera, flowBotones, flowGracias])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
