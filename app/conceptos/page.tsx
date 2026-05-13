"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ChartKind =
  | "liquidity" | "fvg" | "orderblock" | "bos" | "choch"
  | "support" | "resistance" | "uptrend" | "downtrend" | "range"
  | "pullback" | "retest" | "stoploss" | "takeprofit" | "riskreward"
  | "riskmanagement" | "sessions" | "volume" | "manipulation" | "sweep"
  | "institutional" | "confirmation" | "impulse" | "correction"
  | "accumulation" | "distribution" | "psychology" | "journal" | "plan" | "backtesting";

type Concept = {
  id: number;
  title: string;
  tag: string;
  subtitle: string;
  chartKind: ChartKind;
  explanation: string[];
  keys: string[];
  usage: string;
  summary: string;
};

const concepts: Concept[] = [
  {
    id: 1,
    title: "Liquidez",
    tag: "Smart Money",
    subtitle: "Dónde se acumulan órdenes y stops antes del movimiento real.",
    chartKind: "liquidity",
    explanation: [
      "La liquidez es el combustible que mueve el mercado. En términos simples, es la acumulación de órdenes pendientes, stops de pérdida y órdenes de entrada que los traders minoristas colocan en zonas técnicas predecibles como máximos anteriores, mínimos anteriores, líneas de tendencia y niveles psicológicos. Los grandes participantes del mercado —bancos, fondos de cobertura e instituciones— necesitan enormes volúmenes de órdenes contrapuestas para ejecutar sus posiciones sin mover demasiado el precio.",
      "El concepto central es que el precio no se mueve al azar. Antes de cualquier movimiento significativo, suele buscar primero las zonas donde hay mayor concentración de órdenes. Esto ocurre porque las instituciones necesitan esa liquidez para llenar sus posiciones. Cuando el precio barre una zona de liquidez —por ejemplo, rompe brevemente los mínimos donde todos pusieron sus stops— activa esas órdenes y genera el volumen necesario para el movimiento real.",
      "Identificar la liquidez significa aprender a leer el gráfico desde la perspectiva institucional. Las zonas de mayor liquidez se forman sobre máximos previos iguales (equal highs), debajo de mínimos previos iguales (equal lows), en niveles de soporte y resistencia muy visibles, y en los extremos de rangos laterales. Cuanto más obvio sea un nivel técnico para los traders minoristas, más liquidez hay acumulada ahí y más probable es que el precio lo visite antes de moverse en serio.",
      "La clave práctica no es entrar en la primera ruptura de un nivel, sino observar si el precio acepta el nuevo territorio o si solo realizó un barrido rápido para tomar los stops y luego girar. Un barrido de liquidez bien identificado, seguido de una vela de rechazo fuerte, suele ser una de las señales de entrada más confiables del análisis técnico institucional."
    ],
    keys: [
      "Máximos o mínimos iguales acumulan stops de muchos traders.",
      "Las instituciones necesitan liquidez para ejecutar posiciones grandes.",
      "El barrido de liquidez precede al movimiento real en la dirección opuesta.",
      "Cuanto más obvio el nivel, más liquidez y más probable el barrido.",
      "Esperar confirmación de rechazo tras el barrido antes de entrar."
    ],
    usage: "Marcá los equal highs y equal lows en tu gráfico. Cuando el precio los barra con una mecha larga y cierre contrario, buscá confirmación para entrar en la dirección opuesta al barrido.",
    summary: "La liquidez muestra dónde el mercado irá primero antes de moverse en serio. Identificar esas zonas te permite anticipar el movimiento real en lugar de ser atrapado por él."
  },
  {
    id: 2,
    title: "FVG / Fair Value Gap",
    tag: "Smart Money",
    subtitle: "Desequilibrio de precio que funciona como zona de retorno y reacción.",
    chartKind: "fvg",
    explanation: [
      "Un Fair Value Gap (FVG) o Gap de Valor Justo es una ineficiencia que aparece en el gráfico cuando el precio se desplaza con tanta fuerza que deja una zona sin negociar entre tres velas consecutivas. Técnicamente, en un FVG alcista, el mínimo de la tercera vela está por encima del máximo de la primera vela, dejando un espacio vacío en el medio. En un FVG bajista ocurre lo contrario: el máximo de la tercera vela está por debajo del mínimo de la primera.",
      "Este desequilibrio representa una zona donde compradores y vendedores no llegaron a negociar en condiciones equilibradas. El mercado tiene una tendencia natural a volver a esas zonas para 'llenar el gap', es decir, para que el precio vuelva a esa área y permita que los participantes que quedaron fuera del movimiento inicial puedan entrar a un precio razonable. Por eso se llama 'valor justo': el precio regresa a donde debería haber estado.",
      "El FVG es más confiable cuando aparece en un contexto estructural claro: después de un barrido de liquidez, después de un cambio de carácter (CHoCH) o como parte de un desplazamiento impulsivo post-ruptura de estructura (BOS). Un FVG aislado sin contexto tiene mucho menor probabilidad de reaccionar de manera predecible.",
      "En la práctica, se usa como zona de entrada: cuando el precio regresa al FVG desde el lado correcto, se busca una vela de confirmación para entrar en la dirección del impulso original. El stop se coloca por debajo del FVG (en compras) o por encima (en ventas), y el objetivo es el siguiente nivel de liquidez o estructura relevante."
    ],
    keys: [
      "Zona vacía entre tres velas consecutivas tras un movimiento fuerte.",
      "Representa desequilibrio entre oferta y demanda.",
      "El precio tiende a regresar a esa zona antes de continuar.",
      "Más válido cuando sigue a una ruptura de estructura o barrido.",
      "Se usa como zona de entrada con stop ajustado al extremo del gap."
    ],
    usage: "Marcá el gap entre la vela 1 y vela 3 del movimiento impulsivo. Esperá que el precio regrese a esa zona, observá la reacción y buscá confirmación de vela antes de entrar.",
    summary: "El FVG representa un desequilibrio que el mercado tiende a corregir. Cuando el precio retorna a esa zona con confirmación, ofrece una entrada de alta probabilidad en la dirección del impulso original."
  },
  {
    id: 3,
    title: "Order Block",
    tag: "Smart Money",
    subtitle: "Zona institucional donde grandes players ejecutaron órdenes masivas.",
    chartKind: "orderblock",
    explanation: [
      "Un Order Block (OB) es una zona en el gráfico que representa la última vela de dirección contraria antes de un movimiento impulsivo fuerte. Se interpreta como la zona donde las instituciones y grandes participantes del mercado ejecutaron sus órdenes masivas, dejando una 'huella' en el gráfico. En un order block alcista, es la última vela bajista antes de una subida fuerte. En uno bajista, es la última vela alcista antes de una caída significativa.",
      "La lógica detrás del order block es que las instituciones no pueden ejecutar todas sus órdenes de una sola vez sin mover el mercado demasiado. Por eso, cuando el precio regresa a esa zona, hay órdenes institucionales pendientes que se activan, generando una reacción. Es como si el mercado 'recordara' que en ese nivel hubo participación fuerte y vuelve a reaccionar cuando el precio lo revisita.",
      "Para que un order block sea válido, debe cumplir ciertas condiciones: debe generar un desplazamiento fuerte e impulsivo inmediatamente después, debe haber dejado un FVG o ruptura de estructura, y cuando el precio regrese a esa zona, debe haber reacción clara. No toda vela contraria antes de un movimiento es un OB válido; el impulso posterior debe ser contundente.",
      "La entrada en un OB se realiza cuando el precio regresa a esa zona y muestra señales de rechazo: velas de reversión, disminución del momentum bajista (en OB alcistas) o patrones de acción del precio que confirmen la participación. El stop loss se coloca por debajo del orden block completo, dando espacio para que el precio explore la zona sin invalidar la idea."
    ],
    keys: [
      "Última vela contraria antes de un desplazamiento fuerte e impulsivo.",
      "Zona donde las instituciones ejecutaron posiciones masivas.",
      "Debe generar BOS o FVG inmediatamente después para ser válido.",
      "El precio tiende a regresar a esa zona y reaccionar.",
      "Stop debajo del OB completo para dar espacio a la zona institucional."
    ],
    usage: "Identificá la última vela bajista antes de una subida impulsiva (OB alcista). Cuando el precio regrese a esa zona, esperá vela de rechazo o cierre fuerte para entrar con stop bajo el OB.",
    summary: "El order block marca una zona institucional de alta probabilidad de reacción. Cuando el precio la revisita, las órdenes pendientes generan el rechazo que buscamos para entrar en la dirección del impulso original."
  },
  {
    id: 4,
    title: "Break of Structure (BOS)",
    tag: "Estructura",
    subtitle: "Ruptura confirmada de un máximo o mínimo estructural relevante.",
    chartKind: "bos",
    explanation: [
      "El Break of Structure (BOS) o Ruptura de Estructura es uno de los conceptos más fundamentales del análisis institucional. Ocurre cuando el precio rompe de manera decisiva un máximo o mínimo estructural relevante, confirmando la intención y dirección del mercado. En un contexto alcista, el BOS se produce cuando el precio supera un máximo previo importante con cierre de vela por encima. En un contexto bajista, cuando rompe un mínimo previo con cierre por debajo.",
      "La importancia del BOS radica en que confirma que la estructura del mercado ha cambiado o continúa en una dirección. En una tendencia alcista saludable, los BOS al alza se producen de forma consecutiva, marcando cada nuevo máximo como evidencia de control comprador. En una tendencia bajista, los BOS a la baja confirman el dominio vendedor. El BOS es la prueba objetiva de que la tendencia está intacta o que se ha establecido una nueva dirección.",
      "Es fundamental distinguir el BOS de una simple mecha que toca un nivel: el BOS requiere cierre de vela más allá del nivel estructural. Una mecha sin cierre puede ser manipulación o un sweep de liquidez, no necesariamente un BOS válido. El cierre es lo que confirma la aceptación del precio en el nuevo territorio.",
      "Desde el punto de vista operativo, el BOS no se opera directamente —perseguir la ruptura suele resultar en entradas tardías con mal riesgo-beneficio. Lo profesional es usar el BOS para confirmar la dirección y luego esperar un retroceso a una zona de valor (FVG, OB, soporte roto) para entrar con mejor precio y stop más ajustado."
    ],
    keys: [
      "Ruptura de máximo previo (alcista) o mínimo previo (bajista) con cierre.",
      "Confirma la dirección e intención del mercado.",
      "Requiere cierre de vela más allá del nivel, no solo mecha.",
      "No se opera directamente; se usa para definir sesgo direccional.",
      "Luego esperar retroceso a zona de valor para entrar con mejor precio."
    ],
    usage: "Usá el BOS para confirmar tu sesgo de dirección. Una vez que el BOS ocurre, esperá el retroceso a FVG u OB más cercano para buscar entrada en la misma dirección del BOS.",
    summary: "El BOS confirma que la estructura fue rota y establece la dirección dominante del mercado. Es la base para definir el sesgo de trading y buscar entradas en retrocesos dentro de esa dirección."
  },
  {
    id: 5,
    title: "Change of Character (CHoCH)",
    tag: "Estructura",
    subtitle: "Primera señal de posible reversión o cambio de control del mercado.",
    chartKind: "choch",
    explanation: [
      "El Change of Character (CHoCH) o Cambio de Carácter es la primera señal observable de que el control del mercado puede estar transfiriéndose de un lado al otro. A diferencia del BOS que confirma continuación, el CHoCH indica una posible reversión. Aparece cuando, en medio de una tendencia bajista, el precio rompe por primera vez hacia arriba un máximo de la microestructura (el último Lower High), o en una tendencia alcista, cuando rompe hacia abajo un mínimo relevante.",
      "El CHoCH es especialmente poderoso cuando aparece después de un barrido de liquidez. La secuencia clásica es: tendencia en una dirección → barrido de liquidez (toma de stops) → CHoCH → inicio del movimiento contrario. Esta secuencia es la base de la mayoría de los setups institucionales de alta calidad porque combina liquidez tomada con cambio de estructura.",
      "Es importante entender que el CHoCH es una señal temprana, no una garantía. Puede fallar, especialmente en rangos laterales donde los cambios de carácter son frecuentes y poco significativos. Por eso requiere confirmación: lo ideal es ver el CHoCH, esperar un retroceso a FVG u OB, y entrar solo cuando el precio muestre reacción en esa zona.",
      "La diferencia entre CHoCH y BOS en la práctica operativa es que el CHoCH señala un posible inicio de nueva tendencia (reversión), mientras que el BOS confirma continuación de la tendencia existente. El trader debe reconocer cuál de los dos está ocurriendo para no operar contra la tendencia cuando cree estar operando una reversión."
    ],
    keys: [
      "Primera ruptura contraria a la tendencia dominante en microestructura.",
      "Señala posible transferencia de control entre compradores y vendedores.",
      "Más válido cuando sigue a un barrido de liquidez.",
      "Es señal temprana; requiere confirmación adicional.",
      "Diferente al BOS: indica reversión, no continuación."
    ],
    usage: "Buscá CHoCH después de un barrido de liquidez claro. Una vez que ocurre, esperá retroceso a la zona de valor más cercana (FVG u OB) para entrar en la nueva dirección con confirmación.",
    summary: "El CHoCH es el primer aviso de que el mercado puede estar cambiando de dirección. Combinado con un barrido previo de liquidez, es el inicio de la secuencia institucional de alta probabilidad."
  },
  {
    id: 6,
    title: "Soporte",
    tag: "Análisis técnico",
    subtitle: "Zona de demanda donde el precio históricamente encuentra compradores.",
    chartKind: "support",
    explanation: [
      "El soporte es uno de los conceptos más fundamentales del análisis técnico y también uno de los más malentendidos. Es una zona en el gráfico donde el precio ha encontrado demanda suficiente en el pasado para detener una caída y generar un rebote. No es una línea exacta sino un área —una zona de precios donde la presión compradora supera a la vendedora de manera consistente. Esta zona se forma porque muchos traders la recuerdan como punto de compra previo y colocan órdenes allí.",
      "La psicología detrás del soporte es fundamental para entenderlo. Cuando el precio ha rebotado en una zona varias veces, cada rebote crea un 'recuerdo colectivo' en el mercado. Los traders que compraron ahí en el pasado y obtuvieron ganancias quieren repetir la experiencia. Los que vendieron en corto en esa zona y perdieron recuerdan no hacerlo de nuevo. Esto crea una zona de demanda autoreforzada.",
      "Un soporte se vuelve más fuerte cuanto más veces el precio lo ha respetado, pero paradójicamente, cada vez que lo toca lo debilita un poco porque consume las órdenes de compra disponibles allí. Un soporte que ha sido tocado muchas veces tiene más probabilidad de romperse finalmente porque las órdenes acumuladas se van agotando.",
      "Desde el enfoque institucional, los soportes más relevantes no son los más obvios sino los que coinciden con otras confluencias: zonas de FVG, order blocks, niveles de liquidez o retrocesos de tendencia. Un soporte aislado tiene menor probabilidad de mantener que uno con múltiples confluencias. La entrada no se hace simplemente porque el precio 'tocó soporte', sino cuando hay confirmación de reacción: vela de reversión, disminución del volumen bajista o ruptura de microestructura alcista."
    ],
    keys: [
      "Zona de demanda donde el precio ha rebotado en el pasado.",
      "Es un área, no una línea exacta; dar margen al precio.",
      "Se fortalece con múltiples confluencias (FVG, OB, liquidez).",
      "Cada toque lo debilita; muchos toques aumentan la probabilidad de ruptura.",
      "Esperar confirmación de reacción antes de comprar, no entrar a ciegas."
    ],
    usage: "Marcá la zona de soporte como un área. Esperá que el precio llegue ahí y buscá una vela de reversión alcista, mecha larga de rechazo o ruptura de microestructura antes de entrar.",
    summary: "El soporte es una zona donde la demanda histórica supera la oferta. Su poder real está en la confluencia con otros conceptos institucionales y en la confirmación de reacción antes de operar."
  },
  {
    id: 7,
    title: "Resistencia",
    tag: "Análisis técnico",
    subtitle: "Zona de oferta donde el precio históricamente encuentra vendedores.",
    chartKind: "resistance",
    explanation: [
      "La resistencia es el opuesto del soporte: es una zona en el gráfico donde el precio ha encontrado suficiente presión vendedora en el pasado como para detener una subida y generar un rechazo. Al igual que el soporte, no es una línea exacta sino un área de precios donde la oferta supera consistentemente a la demanda. Los traders que compraron por encima de esa zona y quedaron atrapados en pérdidas esperan el regreso del precio para salir sin pérdidas ('manos débiles'), generando presión vendedora.",
      "La psicología detrás de la resistencia incluye varios factores: los traders que vendieron exitosamente en esa zona antes quieren repetirlo, los que compraron ahí y están en pérdida quieren salir sin perder más cuando el precio regresa, y los que se perdieron la venta anterior buscan una segunda oportunidad. Todo esto crea una zona de oferta autoreforzada que puede contener el precio múltiples veces.",
      "Una de las propiedades más importantes de la resistencia es su capacidad de convertirse en soporte una vez rota. Cuando el precio rompe una resistencia de manera convincente —con cierre de vela por encima y desplazamiento posterior—, esa misma zona donde antes había vendedores ahora se convierte en zona de compradores. Esto se debe a que quienes compraron en la ruptura usarán ese nivel como referencia para sus stops, generando demanda si el precio regresa a probar.",
      "El retesteo de una resistencia rota como soporte es uno de los setups más clásicos y fiables del análisis técnico. La entrada se realiza cuando el precio regresa a la antigua resistencia (ahora soporte), muestra rechazo y confirma que el nivel fue aceptado como soporte. El stop se coloca por debajo del nivel para proteger la operación."
    ],
    keys: [
      "Zona de oferta donde el precio ha encontrado vendedores repetidamente.",
      "Psicología de 'manos atrapadas': vendedores esperan el regreso del precio.",
      "La resistencia rota con fuerza se convierte en soporte (rol swap).",
      "El retesteo de resistencia rota como soporte es un setup clásico.",
      "Confirmar ruptura con cierre de vela, no solo mecha sobre el nivel."
    ],
    usage: "Cuando el precio rompe una resistencia con cierre fuerte, marcá esa zona como futuro soporte. Esperá el retesteo y buscá vela de confirmación alcista para entrar con stop bajo el nivel.",
    summary: "La resistencia marca donde la oferta histórica frena el precio. Su ruptura confirmada y el posterior retesteo como soporte generan uno de los setups de mayor probabilidad en análisis técnico."
  },
  {
    id: 8,
    title: "Tendencia alcista",
    tag: "Estructura",
    subtitle: "Secuencia de máximos y mínimos crecientes que define el control comprador.",
    chartKind: "uptrend",
    explanation: [
      "Una tendencia alcista es la estructura más básica y fundamental que debe reconocer cualquier trader. Se define por la presencia de máximos crecientes (Higher Highs - HH) y mínimos crecientes (Higher Lows - HL) de manera consecutiva. Esta secuencia indica que el mercado está siendo controlado por los compradores: cada impulso alcista supera el máximo anterior (HH) y cada retroceso se detiene más arriba que el mínimo anterior (HL), sin romper la estructura.",
      "La tendencia alcista no solo importa en el timeframe que estás operando sino en múltiples timeframes. Un trader profesional alinea su dirección con la tendencia del timeframe mayor. Si en el gráfico diario hay tendencia alcista, buscar compras en H4 o H1 tiene mucho mayor probabilidad que buscar ventas. Este concepto, conocido como análisis top-down, es fundamental para operar con el flujo del mercado en lugar de contra él.",
      "Dentro de una tendencia alcista, los retrocesos (pullbacks) a los Higher Lows son las oportunidades de entrada de mayor calidad. No se compra en el máximo después de un impulso, sino se espera que el precio retroceda a una zona de valor —una zona de demanda, FVG o OB— dentro del Higher Low y ahí buscar la entrada. Comprar en el impulso significa pagar el precio más caro y tener el stop más alejado.",
      "La tendencia alcista se invalida cuando el precio rompe el último Higher Low de manera decisiva. Esa ruptura (que sería un BOS bajista) indica que el control puede estar cambiando y que operar compras ya no tiene la misma probabilidad. El trader debe adaptarse y esperar señales de continuación o cambio de dirección confirmado antes de seguir operando."
    ],
    keys: [
      "Definida por Higher Highs (HH) y Higher Lows (HL) consecutivos.",
      "Los retrocesos a HL son las mejores oportunidades de compra.",
      "Alinear con tendencia del timeframe mayor para mayor probabilidad.",
      "Se invalida con la ruptura decisiva del último Higher Low.",
      "No comprar en el impulso; esperar el retroceso a zona de valor."
    ],
    usage: "En tendencia alcista confirmada, esperá que el precio retroceda a una zona de demanda (OB, FVG, soporte) que coincida con el área del último HL. Buscá confirmación y comprá con stop bajo esa zona.",
    summary: "La tendencia alcista es la estructura que define el control comprador. Operar dentro de ella, comprando los retrocesos a Higher Lows, es la estrategia de mayor probabilidad en mercados direccionales."
  },
  {
    id: 9,
    title: "Tendencia bajista",
    tag: "Estructura",
    subtitle: "Secuencia de máximos y mínimos decrecientes que define el control vendedor.",
    chartKind: "downtrend",
    explanation: [
      "La tendencia bajista es la contraparte de la tendencia alcista y se define por la presencia de máximos decrecientes (Lower Highs - LH) y mínimos decrecientes (Lower Lows - LL) de manera consecutiva. Esta estructura indica que los vendedores tienen el control del mercado: cada impulso bajista crea un nuevo mínimo más bajo (LL) y cada rebote se frena más abajo que el máximo anterior (LH), mostrando que los compradores no pueden recuperar el terreno perdido.",
      "Operar en tendencia bajista requiere disciplina mental para los traders que tienen un sesgo natural hacia las compras (que es más común en traders principiantes). En una tendencia bajista clara, las ventas en los rebotes tienen mucho mayor probabilidad que intentar atrapar el suelo comprando. El mercado puede caer más tiempo del que parece razonable, y los intentos de comprar 'barato' en tendencias bajistas fuertes suelen resultar en pérdidas acumuladas.",
      "Los rebotes dentro de la tendencia bajista (los Lower Highs) son las zonas de venta de mayor calidad. Cuando el precio rebota y llega a una zona de oferta institucional —un OB bajista, un FVG bajista, una resistencia— que coincide con el área del LH esperado, ahí es donde se busca la entrada vendedora con el mejor riesgo-beneficio. El stop se coloca por encima del OB o FVG para dar espacio a la zona.",
      "La tendencia bajista se invalida cuando el precio rompe el último Lower High de manera decisiva con cierre de vela. Esa ruptura indica que los compradores están recuperando terreno y que el control puede estar cambiando. Es la señal para dejar de buscar ventas y esperar confirmación de nuevo sesgo antes de operar."
    ],
    keys: [
      "Definida por Lower Highs (LH) y Lower Lows (LL) consecutivos.",
      "Los rebotes a LH son las mejores oportunidades de venta.",
      "Requiere disciplina para no comprar contra la tendencia dominante.",
      "Se invalida con ruptura decisiva del último Lower High.",
      "No vender en el impulso; esperar el rebote a zona de oferta."
    ],
    usage: "En tendencia bajista confirmada, esperá que el precio rebote a una zona de oferta (OB, FVG, resistencia) que coincida con el área del LH esperado. Buscá confirmación bajista y vendé con stop sobre esa zona.",
    summary: "La tendencia bajista es la estructura que define el control vendedor. Operar dentro de ella, vendiendo los rebotes a Lower Highs, es la estrategia de mayor probabilidad en mercados bajistas."
  },
  {
    id: 10,
    title: "Rango lateral",
    tag: "Contexto",
    subtitle: "Precio consolidado entre soporte y resistencia sin dirección definida.",
    chartKind: "range",
    explanation: [
      "Un rango lateral (o consolidación) ocurre cuando el precio se mueve de manera horizontal entre una zona de soporte (piso) y una zona de resistencia (techo) sin establecer una dirección clara. Los rangos pueden durar desde horas hasta meses y representan un período de equilibrio entre compradores y vendedores donde ningún lado tiene el control dominante. El mercado pasa entre el 60% y el 70% del tiempo en algún tipo de consolidación, por lo que saber cómo manejarse en rangos es tan importante como saber operar tendencias.",
      "La estructura interna de un rango tiene tres zonas bien diferenciadas: el techo (zona de resistencia/oferta), el piso (zona de soporte/demanda) y el centro (zona de equilibrio). El centro del rango es la zona de peor relación riesgo-beneficio porque el precio puede ir tanto hacia el techo como hacia el piso desde ahí, haciendo muy difícil definir un stop lógico. Operar en el centro del rango es un error frecuente en traders menos experimentados.",
      "Las mejores oportunidades dentro de un rango son en sus extremos: compras en el piso con confirmación de rebote y ventas en el techo con confirmación de rechazo. Dentro de los rangos, los barridos de liquidez son muy comunes: el precio rompery falsamente el techo (fake breakout) para tomar los stops de los que venden ahí, y luego caer; o rompe el piso para tomar los stops de los compradores y luego subir. Reconocer estos barridos falsos es clave.",
      "El rango termina con una ruptura genuina: el precio cierra de manera convincente por encima del techo o por debajo del piso con desplazamiento posterior. El retesteo de esa zona rota confirma si la ruptura fue real. Los rangos previos a movimientos grandes suelen ser fases de acumulación (si rompen hacia arriba) o distribución (si rompen hacia abajo)."
    ],
    keys: [
      "Precio oscila entre soporte (piso) y resistencia (techo) sin dirección.",
      "El centro del rango tiene la peor relación riesgo-beneficio.",
      "Los extremos del rango son las mejores zonas de operación.",
      "Los barridos falsos de los extremos son frecuentes; esperar confirmación.",
      "La ruptura del rango con retesteo confirma el nuevo movimiento direccional."
    ],
    usage: "En un rango, operá solo los extremos con confirmación. En el piso, buscá rebote alcista. En el techo, buscá rechazo bajista. Evitá el centro. Si hay ruptura, esperá retesteo antes de operar la continuación.",
    summary: "El rango lateral requiere paciencia y operar solo los extremos con confirmación. Los barridos falsos son parte del juego, y la ruptura del rango con retesteo define el próximo movimiento direccional."
  },
  {
    id: 11,
    title: "Pullback",
    tag: "Entrada",
    subtitle: "Retroceso temporal dentro de una tendencia que ofrece entrada con mejor precio.",
    chartKind: "pullback",
    explanation: [
      "El pullback es un retroceso temporal en contra de la tendencia principal, que le da al precio la oportunidad de 'respirar' y a los traders la posibilidad de entrar en la tendencia con un precio más favorable que perseguir el impulso. En una tendencia alcista, el pullback es una caída temporal antes de que el precio retome la subida. En una bajista, es un rebote temporal antes de que el precio continúe cayendo.",
      "La diferencia entre un pullback (retroceso dentro de tendencia) y una reversión (cambio de tendencia) es crítica y es una de las habilidades más difíciles de desarrollar. Un pullback sano respeta la estructura de la tendencia: en alcista, el retroceso no rompe el último Higher Low; en bajista, el rebote no supera el último Lower High. Cuando el pullback viola esas estructuras, puede estar convirtiéndose en algo más que un simple retroceso.",
      "Los mejores pullbacks ocurren cuando el precio regresa a una confluencia de zonas de valor: un FVG alcista, un order block alcista, un soporte previo o un nivel de retroceso significativo. La confluencia de múltiples zonas en un mismo nivel aumenta exponencialmente la probabilidad de que el pullback se detenga ahí y el precio retome la tendencia. Un pullback a una zona aislada sin confluencia tiene menor probabilidad.",
      "Desde el punto de vista de ejecución, el pullback no se opera simplemente porque 'llegó a la zona'. Se espera confirmación: una vela de reversión alcista (en tendencia alcista), un patrón de acción del precio que muestre que los vendedores están perdiendo fuerza, o una ruptura de microestructura bajista que indique que los compradores están tomando el control nuevamente. La paciencia de esperar esa confirmación es lo que diferencia una entrada de calidad de una prematura."
    ],
    keys: [
      "Retroceso temporal contra la tendencia principal, no una reversión.",
      "Debe respetar la estructura: no romper el HL (alcista) o LH (bajista).",
      "Mayor probabilidad cuando llega a confluencia de zonas de valor.",
      "Esperar confirmación de reacción, no entrar solo porque llegó a la zona.",
      "Permite entrar con mejor precio y stop más ajustado que perseguir el impulso."
    ],
    usage: "Identificá la tendencia dominante y marcá las zonas de valor (FVG, OB, soporte). Cuando el precio retroceda a esa zona, esperá una vela de confirmación (engulfing, pin bar, cierre fuerte) para entrar.",
    summary: "El pullback es la oportunidad de entrar en una tendencia con precio favorable y riesgo reducido. Su calidad depende de la confluencia de la zona donde se detiene y la confirmación de reacción."
  },
  {
    id: 12,
    title: "Retesteo",
    tag: "Entrada",
    subtitle: "El precio regresa a probar un nivel roto para confirmar el cambio de rol.",
    chartKind: "retest",
    explanation: [
      "El retesteo (o retest) ocurre cuando el precio, después de romper un nivel significativo, regresa a ese mismo nivel para 'probarlo' desde el otro lado. Es uno de los setups más clásicos y fiables del análisis técnico porque combina la confirmación de una ruptura con una entrada de bajo riesgo. Una resistencia rota que se convierte en soporte, o un soporte roto que se convierte en resistencia, son los ejemplos más comunes.",
      "La lógica psicológica del retesteo es poderosa. Cuando el precio rompe una resistencia, hay traders que se perdieron la ruptura y esperan que el precio regrese para comprar. Hay traders que vendieron corto pensando que la resistencia mantendría y necesitan cubrir sus pérdidas cuando el precio regrese. Y hay instituciones que compraron en la ruptura y usarán ese nivel como soporte para mantener sus posiciones. Todo esto crea demanda cuando el precio regresa al nivel roto, generando el rebote del retesteo.",
      "No todos los retesteos son iguales en calidad. Los mejores son aquellos donde el nivel roto coincide con otras confluencias: un FVG dejado por el impulso de ruptura, un order block, una zona de liquidez o un nivel de estructura mayor. Cuantas más confluencias tenga el nivel del retesteo, más probable es que el precio reaccione ahí con fuerza.",
      "La entrada en el retesteo se hace cuando el precio toca el nivel y muestra una señal de confirmación: vela de reversión, disminución del volumen o momentum, o una ruptura de microestructura en el timeframe menor. El stop se coloca por debajo del nivel (en retesteos alcistas) o por encima (en bajistas), con espacio suficiente para acomodar la volatilidad normal sin ser sacado por ruido."
    ],
    keys: [
      "El precio regresa a probar el nivel roto desde el otro lado.",
      "Resistencia rota → soporte en retesteo. Soporte roto → resistencia en retesteo.",
      "Psicología: compradores y vendedores atrapados reaccionan en el nivel.",
      "Más fiable cuando coincide con FVG, OB u otras confluencias.",
      "Entrada con confirmación; stop bajo el nivel con espacio para volatilidad."
    ],
    usage: "Esperá que el precio rompa un nivel clave con fuerza (BOS). Cuando regrese a probar ese nivel, buscá confirmación de reacción (vela, volumen, microestructura) para entrar con stop ajustado al otro lado del nivel.",
    summary: "El retesteo confirma que una ruptura fue genuina y ofrece la entrada más segura en la nueva dirección. Es el setup donde la relación riesgo-beneficio suele ser más favorable."
  },
  {
    id: 13,
    title: "Stop Loss",
    tag: "Riesgo",
    subtitle: "El nivel donde la idea queda invalidada y la pérdida se limita.",
    chartKind: "stoploss",
    explanation: [
      "El stop loss es la herramienta más importante de gestión de riesgo. Es una orden predefinida para cerrar una posición cuando el precio alcanza un nivel determinado, limitando la pérdida de esa operación. Más que una herramienta técnica, el stop loss es una declaración de intención: 'Si el precio llega aquí, mi idea de trading estaba equivocada y prefiero perder poco a perder mucho'. Esta mentalidad es lo que separa a los traders que sobreviven de los que no.",
      "La ubicación del stop loss debe ser técnica, no arbitraria ni basada en la cantidad de dinero que no querés perder. Un stop lógico se coloca en un nivel donde, si el precio lo toca, la hipótesis de trading queda claramente invalidada. En una compra en un order block alcista, el stop va por debajo del order block completo. En una venta en un FVG bajista, el stop va por encima del FVG. Si el precio toca esos niveles, significa que la zona institucional no funcionó y la idea era incorrecta.",
      "Uno de los errores más comunes es mover el stop loss una vez que la operación está abierta. Mover el stop para evitar ser salido es una trampa psicológica: aumenta el riesgo de la operación y convierte una pérdida pequeña en una grande. El stop se define antes de entrar, en función del análisis técnico, y se respeta. La única excepción es moverlo a favor (trailing stop) cuando la operación ya está en ganancia.",
      "El tamaño de la posición se calcula en función del stop loss. Si el stop está lejos del precio de entrada, el tamaño de lote debe ser menor para mantener el riesgo fijo. Si el stop está cerca, el lote puede ser mayor. Esta relación entre stop loss y tamaño de posición es la mecánica fundamental de la gestión de riesgo."
    ],
    keys: [
      "Orden automática que limita la pérdida si el precio alcanza el nivel definido.",
      "Debe colocarse en un nivel donde la hipótesis de trading queda invalidada.",
      "Se define ANTES de entrar, basado en análisis técnico, no en dinero.",
      "Nunca mover el stop en contra (ampliar la pérdida); solo a favor.",
      "El tamaño de posición se calcula según la distancia al stop."
    ],
    usage: "Antes de entrar, identificá el nivel donde tu idea queda invalidada (bajo OB en compra, sobre OB en venta). Colocá el stop ahí. Calculá el lote para que esa pérdida represente tu riesgo máximo por operación (ej: 1%).",
    summary: "El stop loss es la herramienta que mantiene viva la cuenta. Su ubicación técnica y el respeto a su nivel son la diferencia entre trading profesional y juego de azar con el capital."
  },
  {
    id: 14,
    title: "Take Profit",
    tag: "Riesgo",
    subtitle: "Zona de salida planificada donde se materializan las ganancias.",
    chartKind: "takeprofit",
    explanation: [
      "El take profit es la orden de cierre de posición en un nivel predefinido de ganancia. Al igual que el stop loss, debe ser planificado antes de abrir la operación, no improvisado una vez que el precio está en movimiento. La falta de un take profit claro lleva a uno de los dos errores más comunes en trading: cerrar la ganancia demasiado pronto por miedo a que revierta, o dejar correr la ganancia hasta que se convierte en pérdida por codicia.",
      "La ubicación del take profit debe ser técnica: se coloca en el siguiente nivel de liquidez, resistencia (en compras) o soporte (en ventas) relevante. No se inventa un número que 'se vea bien' o que represente 2R arbitrariamente. El objetivo debe estar donde el gráfico muestre que el precio encontrará obstáculos: una zona de oferta institucional, un máximo anterior relevante, un FVG bajista, una zona de liquidez acumulada. Si no hay un nivel técnico claro para el objetivo, la operación puede no valer la pena.",
      "Una estrategia eficaz es el take profit parcial: cerrar el 50% o el 70% de la posición cuando el precio alcanza el primer objetivo (TP1, generalmente a 1R o 1.5R), y dejar correr el resto hacia un segundo objetivo (TP2, a 2R o más). Esto asegura ganancias concretas y al mismo tiempo permite capturar movimientos mayores cuando el mercado lo permite. Cuando TP1 es alcanzado, el stop del remanente se mueve al precio de entrada (break even).",
      "El take profit también se puede gestionar dinámicamente usando trailing stops: mover el stop a favor conforme el precio avanza, protegiendo ganancias sin cerrar la posición prematuramente. Esta técnica es especialmente útil en mercados con tendencias fuertes donde los objetivos fijos pueden quedarse cortos."
    ],
    keys: [
      "Orden de cierre en nivel predefinido de ganancia; planificada antes de entrar.",
      "Se ubica en el siguiente nivel técnico relevante (liquidez, resistencia, FVG).",
      "El TP parcial (TP1 y TP2) combina seguridad y captura de movimientos mayores.",
      "Mover stop a break even cuando TP1 es alcanzado para proteger ganancia.",
      "No inventar objetivos arbitrarios; deben tener justificación técnica."
    ],
    usage: "Antes de entrar, identificá el siguiente nivel técnico relevante como TP1 (primer objetivo). Calculá si la relación riesgo-beneficio es al menos 1:1.5. Definí un TP2 más ambicioso si la estructura lo justifica.",
    summary: "El take profit planificado convierte el análisis en ganancia real y evita los errores emocionales de cerrar demasiado pronto o demasiado tarde. Su ubicación técnica define la calidad del setup."
  },
  {
    id: 15,
    title: "Relación Riesgo Beneficio",
    tag: "Riesgo",
    subtitle: "La proporción entre lo que arriesgás y lo que potencialmente ganás.",
    chartKind: "riskreward",
    explanation: [
      "La relación riesgo-beneficio (R:R) es uno de los conceptos más importantes y menos comprendidos del trading. Compara la pérdida potencial de una operación (riesgo, definido por el stop loss) contra la ganancia potencial (beneficio, definido por el take profit). Una relación R:R de 1:2 significa que por cada unidad que arriesgás, buscás ganar dos. Esta proporción es lo que determina si una estrategia puede ser rentable a largo plazo, independientemente de la tasa de aciertos.",
      "La matemática del R:R es poderosa y contraintuitiva. Con una relación de 1:2 (arriesgás 1 para ganar 2), solo necesitás acertar el 34% de las operaciones para no perder dinero. Con una relación de 1:3, con solo el 25% de aciertos no perdés. Esto significa que puedes tener más operaciones perdedoras que ganadoras y aun así ser rentable, siempre que mantengas una buena relación R:R. La mayoría de los traders se obsesiona con la tasa de aciertos cuando deberían obsesionarse con el R:R.",
      "El R:R no se elige arbitrariamente. Debe surgir naturalmente del análisis técnico: el stop está en el nivel de invalidación, el take profit está en el siguiente nivel técnico relevante, y la diferencia entre ambos define el R:R real. Si la relación resultante es menor a 1:1.5, generalmente es mejor no tomar el trade, ya que el riesgo no justifica la ganancia potencial.",
      "Un error común es manipular el stop o el objetivo para que el número de R:R 'se vea mejor'. Poner el stop muy ajustado para que el R:R sea 1:5 pero que el precio lo toque frecuentemente es peor que tener un R:R de 1:2 con un stop técnicamente correcto. La honestidad en la definición de stop y objetivo es fundamental para que el R:R real refleje las condiciones del mercado."
    ],
    keys: [
      "Compara pérdida potencial vs ganancia potencial de la operación.",
      "Con R:R 1:2 solo necesitás acertar el 34% para ser rentable.",
      "Surge del análisis técnico; no se elige arbitrariamente.",
      "Mínimo recomendado: 1:1.5 para que el riesgo valga la pena.",
      "No manipular stop u objetivo para forzar un buen R:R en papel."
    ],
    usage: "Una vez definidos el stop (nivel de invalidación) y el TP (nivel técnico de objetivo), calculá el R:R. Si es menor a 1:1.5, considerá si vale la pena tomar el trade o esperá un setup de mejor calidad.",
    summary: "El R:R es el motor de la rentabilidad a largo plazo. Con una buena relación riesgo-beneficio, podés ser rentable acertando menos de la mitad de tus operaciones, siempre que mantengas la disciplina."
  },
  {
    id: 16,
    title: "Gestión de riesgo",
    tag: "Riesgo",
    subtitle: "El sistema de reglas que protege el capital y garantiza la supervivencia.",
    chartKind: "riskmanagement",
    explanation: [
      "La gestión de riesgo es el conjunto de reglas y prácticas que determina cuánto capital se arriesga en cada operación, cómo se maneja una racha de pérdidas y cómo se preserva el capital para poder seguir operando. Es, sin discusión, el aspecto más importante del trading a largo plazo. Una estrategia con 60% de aciertos sin gestión de riesgo puede destruir una cuenta. Una estrategia con 40% de aciertos con buena gestión de riesgo puede ser muy rentable.",
      "El principio fundamental de la gestión de riesgo es el riesgo fijo por operación: no arriesgar más de un porcentaje determinado del capital total en ninguna operación individual. El estándar recomendado para traders en desarrollo es entre el 0.5% y el 2% por operación. Esto significa que si tenés una cuenta de $10,000 y arriesgás 1%, tu pérdida máxima por operación es $100. Con este sistema, necesitarías 100 operaciones perdedoras consecutivas para perder todo el capital, lo cual es estadísticamente casi imposible si seguís el plan.",
      "La gestión de riesgo también incluye reglas de límites diarios y semanales. Un límite de pérdida diaria del 3-5% (después del cual se deja de operar ese día) evita los 'días de catástrofe' donde las emociones llevan a sobre-operar en pérdida. El trading de revancha —entrar en operaciones por recuperar pérdidas recientes— es uno de los principales destructores de cuentas y solo se evita con reglas claras y respetadas.",
      "El sizing de posición (tamaño del lote) es la herramienta mecánica de la gestión de riesgo. Se calcula dividiendo el riesgo en dinero (capital × porcentaje de riesgo) por la distancia en puntos al stop loss. Esta fórmula asegura que independientemente de dónde esté el stop, la pérdida en caso de tocarlo siempre sea la misma cantidad de dinero o porcentaje de cuenta."
    ],
    keys: [
      "Arriesgar entre 0.5% y 2% del capital por operación como máximo.",
      "Calcular el tamaño de lote según la distancia al stop, no por intuición.",
      "Establecer límite de pérdida diaria (3-5%) y parar cuando se alcanza.",
      "Nunca operar por revancha después de una pérdida.",
      "La consistencia en las reglas de riesgo es más valiosa que acertar entradas."
    ],
    usage: "Define tu riesgo por operación (ej: 1%). Para cada trade, calculá: lote = (capital × 1%) ÷ (distancia en puntos al stop × valor del punto). Respetá el límite diario de pérdida y nunca operés por revancha.",
    summary: "La gestión de riesgo es lo que separa al trader que sobrevive del que quema su cuenta. Las reglas de riesgo fijo y límites diarios son el sistema inmune de la cuenta de trading."
  },
  {
    id: 17,
    title: "Sesiones de mercado",
    tag: "Contexto",
    subtitle: "Los horarios donde cambia radicalmente la actividad, liquidez y volatilidad.",
    chartKind: "sessions",
    explanation: [
      "El mercado de divisas y otros mercados financieros globales operan 24 horas al día, pero no todos los horarios tienen la misma actividad, liquidez y volatilidad. Las tres sesiones principales son la sesión de Asia (Tokio), la sesión de Londres (Europa) y la sesión de Nueva York (América). Cada una tiene características distintas y entender cómo se comporta el precio en cada sesión es fundamental para interpretar correctamente el contexto del mercado.",
      "La sesión asiática (aproximadamente de 00:00 a 09:00 GMT) se caracteriza por menor volatilidad y menor volumen. El precio tiende a moverse en un rango lateral, consolidando el movimiento de la sesión americana anterior. Esta consolidación asiática crea los máximos y mínimos de la sesión que luego serán las zonas de liquidez que las sesiones siguientes buscarán barrer.",
      "La sesión de Londres (07:00 a 16:00 GMT) es la de mayor volumen del mundo y generalmente la que establece el sesgo del día. Frecuentemente comienza con un barrido de la liquidez asiática —rompe el máximo o el mínimo del rango de Asia— y luego establece la dirección del movimiento principal. El overlap con Nueva York (13:00 a 16:00 GMT) es el período de mayor volatilidad del día.",
      "La sesión de Nueva York (13:00 a 22:00 GMT) confirma o revierte el movimiento de Londres. En muchos días, el patrón clásico es: Asia consolida → Londres barre la liquidez asiática y establece dirección → Nueva York confirma y amplía el movimiento. Conocer este ciclo permite al trader anticipar barridos, evitar entrar en el momento equivocado y sincronizarse con el flujo institucional."
    ],
    keys: [
      "Asia: baja volatilidad, formación de rango y liquidez para las próximas sesiones.",
      "Londres: mayor volumen global, barre la liquidez asiática y establece dirección.",
      "Nueva York: confirma o revierte a Londres; overlap 13-16 GMT es el más volátil.",
      "El rango asiático crea las zonas de liquidez que buscan las sesiones siguientes.",
      "Alinear operaciones con la sesión de mayor relevancia para el activo."
    ],
    usage: "Marcá los máximos y mínimos del rango asiático antes de que abra Londres. Observá si Londres los barre y en qué dirección. Usá eso como sesgo para buscar setups durante la sesión de NY.",
    summary: "Las sesiones crean el ciclo diario del mercado: Asia consolida, Londres activa y NY confirma. Entender este ritmo te permite anticipar barridos y alinearte con el flujo de dinero institucional."
  },
  {
    id: 18,
    title: "Volumen",
    tag: "Confirmación",
    subtitle: "La cantidad de actividad detrás de cada movimiento del precio.",
    chartKind: "volume",
    explanation: [
      "El volumen representa la cantidad de contratos, acciones o unidades negociadas en un período determinado. Es el indicador más fundamental de la salud y la fuerza de un movimiento de precio. Mientras el precio nos dice qué está pasando, el volumen nos dice cuánta convicción hay detrás de ese movimiento. Un precio que sube con volumen creciente tiene mucho más respaldo que uno que sube con volumen decreciente.",
      "La relación entre precio y volumen es una de las herramientas de confirmación más poderosas. En un impulso alcista genuino, el volumen debe aumentar durante el movimiento al alza y disminuir durante los retrocesos. Si el precio sube pero el volumen cae, puede ser una señal de que el movimiento está perdiendo fuerza y puede revertirse. Si el precio cae con poco volumen, el retroceso probablemente sea temporal.",
      "La divergencia entre precio y volumen es una señal especialmente útil. Cuando el precio está haciendo nuevos máximos pero el volumen en esos máximos es menor que en los máximos anteriores, hay una divergencia bajista: el movimiento no tiene el mismo respaldo que antes y puede estar cerca de agotarse. Lo opuesto se aplica para divergencias alcistas en mínimos.",
      "En el contexto del análisis institucional, el volumen alto en una zona específica puede indicar que hay participación institucional: absorción de órdenes en un soporte (instituciones comprando mientras los minoristas venden en pánico) o distribución en una resistencia (instituciones vendiendo mientras los minoristas compran en euforia). El volumen inusualmente alto en una vela o zona específica merece atención especial."
    ],
    keys: [
      "Impulsos con volumen alto son más confiables que con volumen bajo.",
      "Retrocesos con volumen bajo confirman que son temporales.",
      "Divergencia precio-volumen puede señalar agotamiento del movimiento.",
      "Volumen alto en soportes puede indicar absorción institucional.",
      "Comparar volumen del impulso vs retroceso para evaluar la salud de la tendencia."
    ],
    usage: "Verificá que los impulsos en tu dirección de trading tengan mayor volumen que los retrocesos. Desconfiá de rupturas de niveles clave con volumen muy bajo: tienen mayor probabilidad de ser falsas.",
    summary: "El volumen es el detector de convicción detrás del precio. Un movimiento respaldado por volumen creciente es más confiable que uno que avanza en silencio, especialmente en rupturas de niveles clave."
  },
  {
    id: 19,
    title: "Manipulación",
    tag: "Smart Money",
    subtitle: "Movimiento diseñado para atrapar traders antes del giro real.",
    chartKind: "manipulation",
    explanation: [
      "La manipulación de mercado, en el contexto del análisis técnico institucional, se refiere a los movimientos diseñados para atrapar a los traders minoristas en el lado equivocado antes de que ocurra el movimiento real. No se trata de conspiración en el sentido literal, sino de la consecuencia natural de cómo los grandes participantes necesitan liquidez para ejecutar sus posiciones. Cuando hay stops acumulados en un nivel obvio, el precio va allí, los activa, y usa esa liquidez para ir en la dirección contraria.",
      "El patrón más común de manipulación es el 'fake breakout' o ruptura falsa: el precio rompe un nivel técnico obvio (resistencia, máximo previo, nivel psicológico), activa los stops de los vendedores en corto y las entradas de los compradores breakout, y luego revierte violentamente en la dirección contraria. Los traders que compraron la ruptura quedan atrapados en pérdidas y sus stops alimentan el movimiento bajista.",
      "La manipulación se identifica observando ciertos patrones: una vela que rompe un nivel obvio con una mecha larga pero cierra de vuelta dentro del rango anterior (señal de rechazo), un movimiento rápido que toca un nivel y revierte sin consolidación, o un rompimiento que ocurre en un horario de baja liquidez (como el inicio de la sesión asiática) y luego es completamente revertido.",
      "La defensa contra la manipulación es la paciencia y la confirmación. No operar en el primer toque de un nivel obvio ni en la primera ruptura. Esperar que el precio muestre aceptación del nuevo territorio (consolida por encima del nivel roto, hace retesteo y rebota) antes de entrar. La manipulación solo atrapa a quienes actúan impulsivamente en el primer movimiento."
    ],
    keys: [
      "El precio va a zonas obvias de stops para tomar esa liquidez.",
      "El fake breakout: rompe el nivel, atrapa traders y revierte con fuerza.",
      "Se identifica por mechas largas que rechazan el nuevo nivel.",
      "Ocurre más frecuentemente en niveles técnicos muy obvios y visibles.",
      "Defensa: esperar aceptación del nuevo nivel antes de operar la ruptura."
    ],
    usage: "Cuando el precio rompe un nivel muy obvio y esperado, no entres inmediatamente. Esperá que el precio demuestre aceptación (consolida arriba o hace retesteo exitoso). Si revierte rápido, puede ser manipulación.",
    summary: "La manipulación es la herramienta que usan los grandes participantes para obtener liquidez barata. Reconocerla te protege de ser la víctima y te permite usar el barrido como oportunidad de entrada."
  },
  {
    id: 20,
    title: "Barrido de liquidez",
    tag: "Smart Money",
    subtitle: "Ruptura breve de un nivel para tomar stops y generar el movimiento real.",
    chartKind: "sweep",
    explanation: [
      "El barrido de liquidez (liquidity sweep) es uno de los conceptos más importantes del análisis institucional moderno. Ocurre cuando el precio rompe brevemente un nivel técnico significativo —un máximo igual, un mínimo igual, una resistencia o soporte clave— activa los stops allí acumulados y luego revierte rápidamente en la dirección contraria. La clave es la brevedad: el precio no acepta el nuevo nivel, simplemente va allí a 'recoger' las órdenes y regresa.",
      "El barrido se forma visualmente como una mecha larga en el gráfico de velas. En un barrido de mínimos (bullish sweep), el precio cae por debajo de los equal lows o de un soporte, activa los stops de los compradores y las entradas de los vendedores breakout, y luego cierra de vuelta por encima del nivel. Esta vela con mecha larga hacia abajo y cierre fuerte hacia arriba es la evidencia del barrido.",
      "Los barridos de liquidez son particularmente importantes porque suelen preceder directamente al movimiento real en la dirección contraria. La secuencia clásica institucional es: liquidez acumulada en un nivel → precio barre esa liquidez (sweep) → cambio de carácter (CHoCH) → entrada en la nueva dirección. Esta secuencia, cuando se completa con claridad, ofrece algunas de las mejores entradas del análisis técnico institucional.",
      "Para operar el barrido, se espera que ocurra (identificable por la mecha que viola el nivel y cierra de vuelta) y luego se busca confirmación de cambio de dirección: un CHoCH en el timeframe menor, una vela de engulfing en la dirección contraria, o un retroceso a un FVG u OB dejado por el movimiento del barrido. El stop se coloca por debajo del extremo de la mecha del barrido."
    ],
    keys: [
      "Ruptura breve de un nivel seguida de reversión rápida; visible como mecha larga.",
      "Activa stops y órdenes acumuladas en el nivel barrido.",
      "Precede al movimiento real en la dirección contraria.",
      "La secuencia completa: liquidez → sweep → CHoCH → entrada.",
      "Stop bajo el extremo de la mecha del barrido para proteger la idea."
    ],
    usage: "Identificá zonas de equal highs o equal lows donde hay stops acumulados. Cuando el precio las barra con mecha larga y cierre de vuelta, buscá CHoCH o vela de confirmación para entrar en la dirección contraria al barrido.",
    summary: "El barrido de liquidez es la firma institucional antes del movimiento real. Reconocerlo te permite entrar justo cuando la mayoría de traders acaban de ser sacados del mercado, con el mejor precio posible."
  },
  {
    id: 21,
    title: "Entrada institucional",
    tag: "Smart Money",
    subtitle: "El setup completo que combina liquidez, estructura y zona para alta probabilidad.",
    chartKind: "institutional",
    explanation: [
      "La entrada institucional no es un único indicador o señal, sino una secuencia lógica y completa de eventos del mercado que, cuando se dan todos juntos, ofrecen un setup de muy alta probabilidad. Es la integración de todos los conceptos del análisis institucional en una narrativa coherente. Los traders que aprenden a leer esta secuencia dejan de buscar 'el indicador perfecto' y empiezan a leer el mercado como una historia con inicio, desarrollo y desenlace.",
      "La secuencia clásica de una entrada institucional alcista sigue este patrón: primero, hay liquidez acumulada visible (equal lows, stops obvios) debajo del precio actual. Segundo, el precio baja y barre esa liquidez (sweep), tomando los stops. Tercero, inmediatamente después del sweep, el precio muestra un cambio de carácter (CHoCH) al romper la microestructura bajista hacia arriba. Cuarto, el precio hace un pequeño retroceso hacia un FVG alcista u order block dejado por el movimiento del CHoCH. Quinto, en esa zona de retroceso, se busca la entrada con confirmación.",
      "Cada elemento de la secuencia tiene su función: la liquidez tomada genera el combustible para el movimiento contrario, el CHoCH confirma que el control cambió, y el retroceso al FVG/OB ofrece la entrada con el mejor precio y el stop más ajustado. Si alguno de estos elementos falta, la probabilidad del setup disminuye significativamente.",
      "La paciencia es el ingrediente invisible de la entrada institucional. Muchos traders ven el CHoCH y entran inmediatamente, perdiendo la oportunidad de esperar el retroceso a la zona de valor. Otros ven el retroceso pero no esperan la confirmación en esa zona. La entrada institucional requiere que todos los elementos estén presentes y alineados antes de ejecutar."
    ],
    keys: [
      "Secuencia completa: liquidez → sweep → CHoCH → retroceso a FVG/OB → entrada.",
      "Cada elemento tiene su función; si falta uno, la probabilidad disminuye.",
      "No entrar en el CHoCH; esperar el retroceso a la zona de valor.",
      "Buscar confirmación en la zona de valor antes de ejecutar.",
      "Stop bajo el extremo del sweep; objetivo en la siguiente zona de liquidez."
    ],
    usage: "Esperá la secuencia completa: identificá liquidez acumulada, observá el sweep, confirmá el CHoCH, esperá el retroceso a FVG u OB, buscá confirmación en esa zona y entrá con stop bajo el sweep.",
    summary: "La entrada institucional es el setup de mayor probabilidad porque combina múltiples confluencias en una narrativa coherente. Requiere paciencia para esperar todos los elementos, pero ofrece la mejor relación riesgo-beneficio."
  },
  {
    id: 22,
    title: "Confirmación",
    tag: "Entrada",
    subtitle: "La señal final que reduce la incertidumbre y justifica la ejecución.",
    chartKind: "confirmation",
    explanation: [
      "La confirmación es la señal que finalmente justifica la ejecución de la operación. Puede ser una vela de acción del precio (pin bar, engulfing, vela de rechazo), una ruptura de microestructura en timeframe menor, un patrón de acción del precio que muestre cambio de control, o incluso un indicador técnico que converja con el análisis estructural. La confirmación es lo que transforma una zona de interés en una operación concreta.",
      "Sin confirmación, operar 'porque el precio tocó la zona' es equivalente a intentar atrapar cuchillos que caen: la zona puede ser válida pero el precio puede seguir moviéndose en tu contra antes de reaccionar. La confirmación actúa como filtro que elimina las entradas prematuras y permite esperar que el precio dé alguna señal de que la zona está siendo respetada antes de comprometer capital.",
      "Los tipos más comunes de confirmación incluyen: la vela engulfing (una vela que 'engulle' completamente el cuerpo de la vela anterior en la dirección contraria, mostrando cambio de control), el pin bar (vela con mecha larga y cuerpo pequeño que muestra rechazo del nivel), y la ruptura de microestructura (en el timeframe menor, el precio forma un patrón de CHoCH mini que confirma la reacción en la zona).",
      "La calidad de la confirmación también importa. Una confirmación en timeframe mayor (H4 o diario) tiene más peso que una en M5. Una vela engulfing que cierra con fuerza tiene más valor que una que solo supera el cuerpo de la anterior por muy poco. Aprender a calificar las confirmaciones —no todas son iguales— es parte del proceso de desarrollo como trader."
    ],
    keys: [
      "La señal final que justifica ejecutar la operación en la zona de interés.",
      "Evita entrar 'porque tocó la zona' sin ver reacción del precio.",
      "Tipos comunes: engulfing, pin bar, ruptura de microestructura.",
      "La confirmación en timeframe mayor tiene más peso.",
      "Calificar la calidad de la confirmación: no todas son igualmente válidas."
    ],
    usage: "Antes de entrar en cualquier zona de valor (OB, FVG, soporte), definí qué tipo de confirmación necesitás ver. Solo ejecutá cuando esa señal aparezca, sin excepciones. Definilo en tu plan antes de mirar el gráfico.",
    summary: "La confirmación es el filtro que separa las entradas de calidad de las impulsivas. Exige que el precio muestre que la zona está siendo respetada antes de comprometer capital, reduciendo significativamente las entradas prematuras."
  },
  {
    id: 23,
    title: "Impulso",
    tag: "Estructura",
    subtitle: "Movimiento fuerte y decisivo que desplaza el precio con convicción.",
    chartKind: "impulse",
    explanation: [
      "El impulso es un movimiento de precio fuerte, rápido y decisivo que desplaza el precio significativamente en una dirección, generalmente dejando evidencia estructural como FVGs, order blocks y rupturas de estructura. Los impulsos se distinguen de los movimientos normales por su velocidad, el tamaño de las velas (cuerpos grandes con pocas mechas), la profundidad del desplazamiento y el volumen que los acompaña.",
      "Los impulsos son el combustible de las tendencias. Cada nuevo Higher High en una tendencia alcista es el resultado de un impulso. Cada nuevo Lower Low en una bajista también. Entre impulso e impulso suele haber correcciones o consolidaciones, que son las oportunidades de entrada para participar en el siguiente impulso. Entender esta mecánica —impulso, corrección, impulso— es la base del análisis de olas y de la teoría de Dow.",
      "La importancia técnica del impulso es que genera las zonas que luego usamos para operar. Un impulso alcista deja FVGs alcistas (que serán zonas de compra en el retroceso), establece un nuevo order block (la última vela bajista antes del impulso), y rompe estructuras (BOS). Todas estas zonas son heredadas del impulso y son las que buscaremos cuando el precio retroceda.",
      "En la práctica, el impulso nunca se opera directamente —es demasiado tarde para entrar con buen riesgo-beneficio cuando el impulso ya está en marcha. Su función es definir la dirección del mercado y generar las zonas donde buscaremos la entrada en el siguiente retroceso. El trader paciente que espera el retroceso al FVG o al OB del impulso anterior tiene el mejor precio de entrada y el stop más ajustado."
    ],
    keys: [
      "Movimiento fuerte con velas de cuerpo grande y desplazamiento significativo.",
      "Genera FVGs, order blocks y rupturas de estructura como evidencia.",
      "Define la dirección del mercado y crea las zonas de entrada.",
      "No se opera directamente; se espera el retroceso para entrar.",
      "El volumen acompañante confirma la legitimidad del impulso."
    ],
    usage: "Cuando identificás un impulso, marcá el FVG y el OB que dejó. Esperá que el precio retroceda a esas zonas para buscar entrada en la dirección del impulso, no intentes entrar durante el impulso mismo.",
    summary: "El impulso define la dirección y crea las zonas que usamos para operar. Su función es ser mapeado, no perseguido: las mejores entradas están en los retrocesos a las zonas que el impulso genera."
  },
  {
    id: 24,
    title: "Retroceso",
    tag: "Estructura",
    subtitle: "Movimiento correctivo contra el impulso principal que ofrece la entrada.",
    chartKind: "correction",
    explanation: [
      "El retroceso o corrección es el movimiento de precio que va en contra de la dirección del impulso principal. Es la 'pausa' o 'respiración' del mercado antes de continuar en la dirección dominante. Los retrocesos son naturales e inevitables: ningún mercado sube o baja en línea recta. La habilidad de distinguir si un movimiento contrario es un retroceso (temporal) o una reversión (permanente) es una de las más valiosas en trading.",
      "Los retrocesos sanos tienen características identificables. En una tendencia alcista, el retroceso debe tener velas más pequeñas que las del impulso, menor volumen, y detenerse antes de violar el último Higher Low estructural. La estructura interna del retroceso suele mostrar menos convicción: muchas velas pequeñas, mechas largas en ambos lados, o incluso un movimiento lateral. Todo esto indica que la presión vendedora es temporal, no una genuina toma de control.",
      "La profundidad del retroceso es otro indicador de salud. Los retrocesos más comunes se detienen entre el 38.2% y el 61.8% del impulso anterior (niveles de Fibonacci), aunque esto no es una regla estricta. En el análisis institucional, la profundidad correcta es la que lleva el precio de vuelta a la zona de valor relevante: el FVG, el OB o el soporte/resistencia que actúa como zona de demanda u oferta institucional.",
      "Un retroceso que supera el 100% del impulso anterior (rompe el punto de inicio del impulso) ya no es un retroceso sino potencialmente una reversión. Este es el límite técnico que define si la idea de continuación sigue siendo válida. Si el precio viola ese nivel, la hipótesis de retroceso queda invalidada y hay que reconsiderar el análisis."
    ],
    keys: [
      "Movimiento contrario al impulso principal; natural e inevitable en todo mercado.",
      "Velas más pequeñas y menor volumen que el impulso: señal de salud.",
      "Se detiene en zonas de valor: FVG, OB, soporte/resistencia institucional.",
      "Si viola el punto de inicio del impulso, puede ser reversión, no retroceso.",
      "La zona donde se detiene el retroceso es la zona de entrada."
    ],
    usage: "Después de un impulso, esperá el retroceso a la zona de valor marcada (FVG, OB). Observá la calidad del retroceso: pocas velas pequeñas es más sano. Buscá confirmación en esa zona para entrar en la dirección del impulso.",
    summary: "El retroceso es la oportunidad de entrar en la dirección del impulso con el mejor precio. La zona donde se detiene es la zona de valor, y la calidad del retroceso (suave y ordenado) indica que la tendencia sigue sana."
  },
  {
    id: 25,
    title: "Acumulación",
    tag: "Ciclo de mercado",
    subtitle: "Fase de consolidación donde las instituciones construyen posiciones compradoras.",
    chartKind: "accumulation",
    explanation: [
      "La acumulación es una fase del ciclo de mercado que ocurre típicamente después de una tendencia bajista significativa. Aparece visualmente como una consolidación lateral —un rango— en la parte baja del gráfico. Durante este período, se interpreta que los grandes participantes del mercado (instituciones, fondos) están comprando gradualmente grandes cantidades de activo sin mover el precio demasiado, 'acumulando' posiciones largas a precios favorables antes del siguiente movimiento alcista.",
      "La fase de acumulación tiene una estructura interna característica. Después de la caída, el precio forma un rango con un piso (soporte) y un techo (resistencia). Dentro de ese rango, es común ver barridos de liquidez hacia abajo —el precio cae brevemente por debajo del piso, activa los stops de los compradores y recoge liquidez barata— antes de rebotar con fuerza. Estos barridos de los mínimos dentro del rango son señales de absorción institucional: las instituciones compran los stops vendidos por los minoristas en pánico.",
      "La confirmación de que la acumulación terminó y que la expansión alcista está comenzando llega con la ruptura del techo del rango de manera convincente, seguida idealmente de un retesteo exitoso de ese techo como soporte. Esta secuencia —rango → barrido de mínimos → ruptura alcista → retesteo → expansión— es el patrón de Wyckoff clásico de acumulación.",
      "No toda consolidación lateral es acumulación. La diferencia entre acumulación y distribución (la fase opuesta) a veces solo se confirma con la dirección de la ruptura. Sin embargo, el contexto ayuda: si el precio viene de una tendencia bajista prolongada y el rango se forma en una zona de demanda histórica con barridos frecuentes de los mínimos, es más probable que sea acumulación."
    ],
    keys: [
      "Consolidación lateral en zona baja después de tendencia bajista.",
      "Las instituciones compran gradualmente sin mover el precio significativamente.",
      "Los barridos de mínimos dentro del rango son señales de absorción institucional.",
      "Confirmación: ruptura alcista del techo del rango con retesteo exitoso.",
      "Contexto previo (tendencia bajista larga + zona de demanda) aumenta probabilidad."
    ],
    usage: "Identificá rangos laterales que se forman en zonas de demanda históricas después de caídas prolongadas. Observá si hay barridos de los mínimos del rango. Cuando el techo se rompa con fuerza, buscá el retesteo para entrar alcista.",
    summary: "La acumulación es donde las instituciones se posicionan silenciosamente antes de una expansión alcista. Reconocerla permite entrar temprano en el movimiento antes de que el precio suba significativamente."
  },
  {
    id: 26,
    title: "Distribución",
    tag: "Ciclo de mercado",
    subtitle: "Fase de consolidación donde las instituciones venden sus posiciones compradoras.",
    chartKind: "distribution",
    explanation: [
      "La distribución es la fase opuesta a la acumulación. Ocurre típicamente después de una tendencia alcista significativa y aparece visualmente como una consolidación lateral en la parte alta del gráfico. Durante este período, se interpreta que las instituciones están vendiendo gradualmente sus posiciones largas (que compraron durante la acumulación) a los traders minoristas que compran eufóricos en los máximos, 'distribuyendo' sus posiciones antes del siguiente movimiento bajista.",
      "La estructura interna de la distribución también tiene características propias. El precio forma un rango alto con soporte y resistencia. Dentro del rango, son comunes los barridos de los máximos —el precio sube brevemente por encima de la resistencia, atrae a los compradores de breakout y luego revierte con fuerza. Estos barridos de máximos son señales de distribución: las instituciones venden a los compradores minoristas que entran entusiasmados en las rupturas alcistas falsas.",
      "La confirmación de que la distribución terminó llega con la ruptura del soporte del rango hacia abajo, seguida del retesteo de ese soporte como resistencia. Esta es la señal de que el ciclo bajista ha comenzado. La velocidad y fuerza de la caída posterior suelen ser proporcionales al tiempo que duró la distribución: una distribución larga y bien formada suele preceder una caída significativa.",
      "Psicológicamente, la distribución ocurre en el momento de mayor euforia del mercado, cuando los análisis y medios de comunicación son más alcistas. Esto la hace difícil de detectar para quien no conoce la estructura, porque todo parece indicar continuación alcista justo cuando las instituciones están vendiendo. La señal más clara son los barridos repetidos de los máximos que no logran sostener el precio arriba."
    ],
    keys: [
      "Consolidación lateral en zona alta después de tendencia alcista.",
      "Las instituciones venden sus posiciones a los compradores minoristas.",
      "Los barridos de máximos dentro del rango son señales de distribución.",
      "Confirmación: ruptura bajista del soporte del rango con retesteo como resistencia.",
      "Ocurre en momentos de euforia; difícil de detectar sin conocer la estructura."
    ],
    usage: "Identificá rangos laterales en zonas de oferta históricas después de subidas prolongadas. Observá barridos repetidos de los máximos del rango. Cuando el soporte se rompa con fuerza, buscá el retesteo como resistencia para entrar bajista.",
    summary: "La distribución es donde las instituciones salen silenciosamente de sus posiciones largas mientras los minoristas compran eufóricos. Reconocerla permite posicionarse corto antes de la caída que sigue."
  },
  {
    id: 27,
    title: "Psicología del trader",
    tag: "Mentalidad",
    subtitle: "El control emocional que determina si ejecutás el plan o reaccionás al miedo.",
    chartKind: "psychology",
    explanation: [
      "La psicología del trader es, según la mayoría de los traders profesionales, el factor determinante en el éxito o fracaso a largo plazo. Se puede tener la mejor estrategia del mundo, pero si la ejecución está contaminada por el miedo, la codicia, la impaciencia o el ego, los resultados serán inconsistentes o directamente negativos. La paradoja del trading es que las respuestas emocionales que nos han ayudado a sobrevivir como especie —el miedo al peligro, la euforia del éxito— son exactamente las que nos sabotean en los mercados financieros.",
      "Los sesgos emocionales más comunes que afectan al trader son el FOMO (Fear Of Missing Out): entrar tarde en un movimiento por miedo a perdérselo, pagando precios malos. El trading de revancha: operar para recuperar pérdidas recientes, tomando riesgos excesivos con peor discernimiento. La sobreconfianza después de una racha ganadora, que lleva a aumentar el tamaño de posición en momentos de menor claridad. Y el exceso de confianza, que lleva a desviarse del plan cuando parece 'muy claro' lo que va a pasar.",
      "El ciclo emocional del mercado sigue un patrón predecible que opera en contra del trader típico: optimismo en la entrada, euforia cuando la operación gana, pánico cuando revierte, capitulación cuando toca el stop, y desesperanza después de la pérdida. Entender este ciclo y desarrollar una respuesta neutral a cada etapa —ni eufórico cuando gana ni desesperado cuando pierde— es lo que define la madurez psicológica del trader.",
      "Las herramientas prácticas para mejorar la psicología incluyen: el diario de trading (para detectar patrones emocionales), el plan de trading con reglas claras (para eliminar decisiones en el momento), los límites de pérdida diaria (para evitar el trading de revancha), y la práctica de mindfulness o meditación para aumentar la consciencia de los estados emocionales. El trading psicológicamente sano es aburrido: sin drama, sin euforia, sin revancha."
    ],
    keys: [
      "Las emociones (miedo, codicia, euforia) sabotean la ejecución del plan.",
      "FOMO, revancha y sobreconfianza son los enemigos más comunes.",
      "El ciclo emocional del mercado opera en contra del trader típico.",
      "El trading psicológicamente sano es aburrido: sin drama emocional.",
      "Herramientas: diario, plan con reglas, límites de pérdida, mindfulness."
    ],
    usage: "Antes de abrir el gráfico, evaluá tu estado emocional. Si estás ansioso, enojado o eufórico, tomá distancia. Operá solo cuando estés en un estado neutral. Registrá tus emociones en el diario junto con los resultados.",
    summary: "La psicología es el factor limitante en trading cuando la estrategia ya es sólida. Desarrollar disciplina emocional, reconocer los sesgos y crear rutinas que neutralicen las emociones es el trabajo más importante del trader avanzado."
  },
  {
    id: 28,
    title: "Diario de trading",
    tag: "Proceso",
    subtitle: "El registro sistemático que convierte la experiencia en mejora medible.",
    chartKind: "journal",
    explanation: [
      "El diario de trading es una herramienta de mejora continua que registra de manera sistemática todas las operaciones: la razón de entrada, el análisis previo, el resultado, las emociones durante la operación y las lecciones aprendidas. Su propósito es convertir la experiencia subjetiva del trading —que la memoria tiende a distorsionar, recordando los éxitos mejor que los fracasos— en datos objetivos que permitan identificar patrones, corregir errores y mejorar la estrategia con base en evidencia real.",
      "Sin un diario, el trader aprende muy lentamente porque su único feedback es la memoria, que es selectiva y falible. Con un diario bien llevado, el trader puede analizar su historial y descubrir cosas que nunca habría notado: que sus mejores operaciones ocurren en la sesión de Londres pero pierde dinero en la sesión asiática, que el setup de OB+FVG tiene un 65% de aciertos pero el de solo FVG tiene un 40%, o que cuando opera con más de 5 trades al día su rendimiento cae significativamente.",
      "Un diario de trading efectivo debe incluir: la captura de pantalla del gráfico antes de entrar (con el análisis marcado), la captura después del cierre (mostrando el resultado), el tipo de setup, el timeframe, la sesión, el R:R planificado, el R:R real obtenido, el resultado en dólares o R, las emociones durante la operación y una reflexión breve sobre qué salió bien y qué se puede mejorar.",
      "La revisión periódica del diario —semanal y mensual— es tan importante como el registro mismo. Es en la revisión donde se extraen las conclusiones: qué setups tienen mayor edge, en qué horarios se rinde mejor, cuáles son los errores recurrentes. Esta información es el activo más valioso de un trader y no tiene precio porque está construida sobre su propia experiencia."
    ],
    keys: [
      "Registrá cada operación con captura de pantalla, setup, resultado y emociones.",
      "Convierte la experiencia subjetiva en datos objetivos y analizables.",
      "Incluir: entrada, análisis, resultado, R:R planificado vs real, reflexión.",
      "La revisión semanal y mensual es donde se extraen las conclusiones reales.",
      "Permite identificar qué setups y horarios tienen mayor edge personal."
    ],
    usage: "Antes de cerrar cada operación, tomá captura del gráfico. Registrá el setup, el resultado en R, tu estado emocional y una reflexión de 2-3 líneas. Revisá el diario cada semana para identificar patrones.",
    summary: "El diario de trading es el sistema de mejora continua más poderoso disponible. Sin él, la experiencia es anécdota. Con él, se convierte en datos accionables que dirigen la mejora de manera sistemática."
  },
  {
    id: 29,
    title: "Plan de trading",
    tag: "Proceso",
    subtitle: "El conjunto de reglas que elimina las decisiones emocionales en el momento.",
    chartKind: "plan",
    explanation: [
      "El plan de trading es un documento escrito que define con precisión las condiciones bajo las cuales vas a operar: qué setups buscás, en qué timeframes, en qué sesiones, cuánto arriesgás por operación, cuándo detenés el trading ese día y cómo manejás las operaciones abiertas. Su propósito es eliminar la toma de decisiones en el momento —cuando las emociones están activas— y reemplazarla con reglas predefinidas tomadas en un estado mental tranquilo y analítico.",
      "Sin un plan, cada decisión de trading se toma en el contexto emocional del momento: si el mercado acaba de hacer un movimiento fuerte, el FOMO presiona. Si se acaba de perder una operación, el deseo de revancha presiona. Si se acaban de ganar varias, la sobreconfianza presiona. El plan es el antídoto porque establece condiciones objetivas: 'entro cuando se cumplan X, Y y Z; si no se cumplen, no entro, sin excepción'.",
      "Un plan de trading efectivo debe responder estas preguntas: ¿Qué activos operás? ¿En qué timeframes buscás setups? ¿En qué sesiones operás? ¿Cuáles son los setups válidos (ej: sweep + CHoCH + FVG)? ¿Cuánto arriesgás por operación? ¿Cuál es tu límite de pérdida diaria? ¿Cuántas operaciones máximas por día? ¿Cómo gestionás el trade una vez abierto (TP parcial, trailing, etc.)?",
      "El plan no es estático. Se revisa y actualiza periódicamente en función de los datos del diario de trading. Si el backtesting o el forward testing muestran que ciertos setups del plan tienen mejor rendimiento que otros, el plan se ajusta para enfocarse en lo que funciona. Esta evolución continua del plan, basada en datos y no en intuición, es lo que construye un sistema de trading profesional y consistente."
    ],
    keys: [
      "Documento escrito con reglas claras para cada decisión de trading.",
      "Elimina la toma de decisiones emocionales en el momento de mercado.",
      "Debe definir: setups, timeframes, sesiones, riesgo, límites y gestión.",
      "Se opera solo cuando se cumplen las condiciones del plan; sin excepciones.",
      "Se actualiza periódicamente con base en los datos del diario."
    ],
    usage: "Escribí tu plan antes de abrir los gráficos. Definí exactamente qué condiciones deben cumplirse para entrar. Si el mercado no muestra esas condiciones, no operés. Revisá y actualizá el plan mensualmente.",
    summary: "El plan de trading es el sistema que hace que el trading sea reproducible y consistente. Convierte la estrategia en reglas y las reglas en hábitos, eliminando el factor emocional de las decisiones más importantes."
  },
  {
    id: 30,
    title: "Backtesting",
    tag: "Proceso",
    subtitle: "Probar una estrategia en datos históricos para validar su edge real.",
    chartKind: "backtesting",
    explanation: [
      "El backtesting es el proceso de aplicar las reglas de una estrategia de trading a datos históricos de precio para evaluar cómo habría funcionado en el pasado. Es el método científico aplicado al trading: en lugar de operar con dinero real basándose en suposiciones o intuición, primero se verifica si la estrategia tiene un edge estadístico medible a través de una muestra suficientemente grande de operaciones históricas.",
      "Un backtesting riguroso requiere varias condiciones para ser válido. Primero, las reglas deben ser completamente objetivas y definidas antes de empezar: no se pueden cambiar las reglas mientras se hace el test. Segundo, la muestra debe ser suficientemente grande: mínimo 50-100 operaciones para que las estadísticas sean significativas. Tercero, el período debe incluir diferentes condiciones de mercado: tendencias, rangos, alta y baja volatilidad. Y cuarto, el evaluador debe ser honesto y no seleccionar solo los mejores resultados.",
      "Las métricas clave que produce un backtesting son: la tasa de aciertos (% de operaciones ganadoras), el R:R promedio real (no el planificado), el profit factor (suma de ganancias ÷ suma de pérdidas; debe ser mayor a 1.5 para ser viable), el drawdown máximo (mayor caída porcentual desde el pico de equity) y la expectativa matemática (ganancia esperada por operación en R).",
      "El backtesting tiene limitaciones importantes que deben ser reconocidas. El 'curve fitting' o sobreoptimización —ajustar las reglas hasta que funcionan perfectamente en el histórico— es una trampa común que produce resultados que no se replican en el mercado real. La solución es el forward testing: después del backtesting, operar el sistema en demo o con capital reducido en condiciones de mercado real durante un período significativo antes de escalar el capital."
    ],
    keys: [
      "Aplicar las reglas de la estrategia a datos históricos antes de operar en real.",
      "Requiere reglas objetivas, muestra mínima de 50-100 operaciones y honestidad.",
      "Métricas clave: win rate, profit factor (>1.5), drawdown, expectativa matemática.",
      "Evitar sobreoptimización: no cambiar reglas para que 'funcionen en el pasado'.",
      "Complementar con forward testing en demo antes de escalar capital real."
    ],
    usage: "Definí tus reglas de entrada y salida de manera completamente objetiva. Aplicálas a 3-6 meses de datos históricos, registrando cada operación. Analizá el profit factor y el drawdown antes de operar en real.",
    summary: "El backtesting es la validación científica de una estrategia. Sin él, se opera con fe; con él, se opera con evidencia. Es el paso imprescindible entre tener una idea de trading y convertirla en un sistema confiable."
  }
];

// ─────────────────────────────────────────────
// CHART STYLE HELPERS — didactic style matching the reference image
// Dark grey background, solid label boxes, thick arrows, large candles
// ─────────────────────────────────────────────

const BG = "#1a1f2e";
const GRID = "#2a3045";
const BULL_BODY = "#2d9e5f";
const BULL_WICK = "#1e7a47";
const BEAR_BODY = "#c0392b";
const BEAR_WICK = "#922b21";
const LABEL_BG = "#2d3448";
const LABEL_TEXT = "#e8ecf4";

function py(price: number, minP = 0, maxP = 100, top = 28, bottom = 220): number {
  return top + ((maxP - price) / (maxP - minP)) * (bottom - top);
}

interface CandleData { o: number; h: number; l: number; c: number }

function Candle({ x, candle, minP = 0, maxP = 100, w = 14 }: {
  x: number; candle: CandleData; minP?: number; maxP?: number; w?: number
}) {
  const bull = candle.c >= candle.o;
  const bodyTop = py(Math.max(candle.o, candle.c), minP, maxP);
  const bodyBot = py(Math.min(candle.o, candle.c), minP, maxP);
  const bodyH = Math.max(3, bodyBot - bodyTop);
  return (
    <g>
      <line x1={x} y1={py(candle.h, minP, maxP)} x2={x} y2={py(candle.l, minP, maxP)}
        stroke={bull ? BULL_WICK : BEAR_WICK} strokeWidth="2" />
      <rect x={x - w / 2} y={bodyTop} width={w} height={bodyH}
        fill={bull ? BULL_BODY : BEAR_BODY} rx="1.5" />
    </g>
  );
}

function GridLines({ levels, minP, maxP }: { levels: number[]; minP: number; maxP: number }) {
  return (
    <>
      {levels.map(p => (
        <line key={p} x1={28} y1={py(p, minP, maxP)} x2={492} y2={py(p, minP, maxP)}
          stroke={GRID} strokeWidth="1" />
      ))}
    </>
  );
}

function SolidLabel({ x, y, text, bg = LABEL_BG, color = LABEL_TEXT, size = 9, anchor = "middle" as "middle" | "start" | "end", bold = true }: {
  x: number; y: number; text: string; bg?: string; color?: string; size?: number; anchor?: "middle" | "start" | "end"; bold?: boolean
}) {
  const approxW = text.length * size * 0.62 + 10;
  const dx = anchor === "middle" ? -approxW / 2 : anchor === "end" ? -approxW : 0;
  return (
    <g>
      <rect x={x + dx} y={y - size - 2} width={approxW} height={size + 8} fill={bg} rx="3" />
      <text x={x + (anchor === "middle" ? 0 : anchor === "end" ? -approxW / 2 + 5 : approxW / 2 - 5)}
        y={y + 2} textAnchor="middle" fill={color} fontSize={size} fontWeight={bold ? "700" : "400"}>{text}</text>
    </g>
  );
}

function DashedLine({ y, x1 = 28, x2 = 492, color, dash = "8 5" }: {
  y: number; x1?: number; x2?: number; color: string; dash?: string
}) {
  return <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="1.5" strokeDasharray={dash} />;
}

function ZoneBox({ x1, x2, y1, y2, color }: { x1: number; x2: number; y1: number; y2: number; color: string }) {
  return (
    <g>
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill={color} opacity="0.15" />
      <line x1={x1} y1={y1} x2={x2} y2={y1} stroke={color} strokeWidth="1.5" strokeDasharray="7 4" opacity="0.9" />
      <line x1={x1} y1={y2} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="7 4" opacity="0.9" />
    </g>
  );
}

function ThickArrow({ x1, y1, x2, y2, color, id }: { x1: number; y1: number; x2: number; y2: number; color: string; id: string }) {
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
          <path d="M0,0 L0,8 L10,4 z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" markerEnd={`url(#${id})`} />
    </g>
  );
}

// ─────────────────────────────────────────────
// CHART COMPONENTS — new didactic style
// ─────────────────────────────────────────────

function ChartLiquidity({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 65, h: 72, l: 58, c: 62 },
        { o: 62, h: 69, l: 57, c: 60 },
        { o: 60, h: 67, l: 56, c: 63 },
        { o: 63, h: 68, l: 55, c: 58 },
        { o: 58, h: 63, l: 46, c: 52 }, // SWEEP
        { o: 52, h: 76, l: 50, c: 73 }, // reversal
        { o: 73, h: 84, l: 70, c: 81 },
        { o: 81, h: 92, l: 78, c: 89 },
      ]
    : [
        { o: 52, h: 60, l: 46, c: 56 },
        { o: 56, h: 63, l: 51, c: 60 },
        { o: 60, h: 65, l: 54, c: 62 },
        { o: 62, h: 67, l: 56, c: 64 },
        { o: 64, h: 80, l: 62, c: 74 }, // SWEEP
        { o: 74, h: 76, l: 52, c: 55 }, // reversal
        { o: 55, h: 57, l: 42, c: 44 },
        { o: 44, h: 46, l: 32, c: 34 },
      ];
  const xs = [52, 100, 148, 196, 252, 318, 384, 450];
  const min = 30, max = 98;

  const eqY = bull ? py(56, min, max) : py(65, min, max);
  const sweepY = bull ? py(46, min, max) : py(80, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[40, 55, 70, 85]} minP={min} maxP={max} />

      <ZoneBox x1={28} x2={240} y1={eqY - 6} y2={eqY + 6} color={bull ? "#facc15" : "#facc15"} />
      <SolidLabel x={260} y={eqY + 4} text={bull ? "ZONA DE LIQUIDEZ" : "ZONA DE LIQUIDEZ"} bg="#b45309" color="#fff" size={8.5} anchor="start" />

      <DashedLine y={eqY} x1={28} x2={492} color="#facc15" />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <DashedLine y={sweepY} x1={222} x2={285} color="#f97316" />
      <SolidLabel x={290} y={sweepY + 3} text="BARRIDO DE LIQUIDEZ" bg="#c2410c" color="#fff" size={8} anchor="start" />

      <ThickArrow
        x1={315} y1={bull ? py(62, min, max) : py(60, min, max)}
        x2={315} y2={bull ? py(86, min, max) : py(37, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`liq-${mode}`}
      />
      <SolidLabel x={340} y={bull ? py(90, min, max) : py(33, min, max)}
        text={bull ? "MOVIMIENTO ALCISTA" : "MOVIMIENTO BAJISTA"}
        bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} anchor="start" />
    </svg>
  );
}

function ChartFVG({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 42, h: 50, l: 38, c: 46 },
        { o: 46, h: 55, l: 43, c: 52 },
        { o: 52, h: 92, l: 50, c: 88 }, // impulse — FVG between 55 and 80
        { o: 88, h: 95, l: 82, c: 90 },
        { o: 90, h: 92, l: 62, c: 66 }, // retrace into FVG
        { o: 66, h: 80, l: 64, c: 77 },
        { o: 77, h: 90, l: 74, c: 87 },
        { o: 87, h: 96, l: 84, c: 93 },
      ]
    : [
        { o: 85, h: 90, l: 76, c: 80 },
        { o: 80, h: 82, l: 70, c: 74 },
        { o: 74, h: 75, l: 36, c: 40 }, // impulse — FVG between 70 and 42
        { o: 40, h: 44, l: 32, c: 36 },
        { o: 36, h: 68, l: 34, c: 64 }, // retrace into FVG
        { o: 64, h: 66, l: 50, c: 53 },
        { o: 53, h: 55, l: 40, c: 42 },
        { o: 42, h: 44, l: 30, c: 32 },
      ];
  const xs = [48, 96, 152, 210, 272, 335, 398, 460];
  const min = 22, max = 100;

  const fvgTop = bull ? py(80, min, max) : py(70, min, max);
  const fvgBot = bull ? py(55, min, max) : py(42, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[35, 55, 70, 85]} minP={min} maxP={max} />

      <ZoneBox x1={100} x2={492} y1={fvgTop} y2={fvgBot} color="#818cf8" />
      <SolidLabel x={260} y={fvgTop - 6} text="FAIR VALUE GAP (FVG)" bg="#4338ca" color="#fff" size={9} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <ThickArrow
        x1={xs[4]} y1={bull ? py(88, min, max) : py(38, min, max)}
        x2={xs[4]} y2={bull ? py(70, min, max) : py(58, min, max)}
        color="#818cf8" id={`fvg-ret-${mode}`}
      />
      <SolidLabel x={xs[4] + 18} y={bull ? py(73, min, max) : py(54, min, max)}
        text="RETORNO AL FVG" bg="#4338ca" color="#fff" size={8} anchor="start" />
    </svg>
  );
}

function ChartOrderBlock({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 65, h: 70, l: 57, c: 61 },
        { o: 61, h: 66, l: 52, c: 56 },
        { o: 56, h: 61, l: 47, c: 50 }, // OB
        { o: 50, h: 86, l: 49, c: 83 }, // impulse
        { o: 83, h: 90, l: 76, c: 80 },
        { o: 80, h: 82, l: 52, c: 56 }, // retrace to OB
        { o: 56, h: 80, l: 54, c: 77 },
        { o: 77, h: 92, l: 74, c: 89 },
      ]
    : [
        { o: 50, h: 56, l: 44, c: 53 },
        { o: 53, h: 62, l: 50, c: 59 },
        { o: 59, h: 68, l: 56, c: 65 }, // OB
        { o: 65, h: 66, l: 32, c: 36 }, // impulse
        { o: 36, h: 40, l: 28, c: 32 },
        { o: 32, h: 68, l: 30, c: 64 }, // retrace to OB
        { o: 64, h: 66, l: 42, c: 45 },
        { o: 45, h: 47, l: 28, c: 30 },
      ];
  const xs = [48, 96, 148, 206, 264, 326, 390, 454];
  const min = 20, max = 96;

  const obTop = bull ? py(61, min, max) : py(68, min, max);
  const obBot = bull ? py(47, min, max) : py(56, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 48, 64, 80]} minP={min} maxP={max} />

      <ZoneBox x1={118} x2={492} y1={obTop} y2={obBot} color="#f97316" />
      <SolidLabel x={260} y={(obTop + obBot) / 2 + 4} text="ORDER BLOCK" bg="#c2410c" color="#fff" size={9.5} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[2]} y={bull ? py(82, min, max) : py(40, min, max)}
        text={bull ? "ÚLTIMA VELA BAJISTA" : "ÚLTIMA VELA ALCISTA"} bg="#7c2d12" color="#ffd4a0" size={7.5} />

      <ThickArrow
        x1={xs[6]} y1={bull ? py(60, min, max) : py(62, min, max)}
        x2={xs[6]} y2={bull ? py(84, min, max) : py(38, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`ob-arr-${mode}`}
      />
    </svg>
  );
}

function ChartBOS({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 42, h: 54, l: 38, c: 50 },
        { o: 50, h: 62, l: 46, c: 58 }, // previous HH = 62
        { o: 58, h: 60, l: 48, c: 52 },
        { o: 52, h: 56, l: 44, c: 50 },
        { o: 50, h: 78, l: 48, c: 74 }, // BOS breaks 62
        { o: 74, h: 82, l: 68, c: 79 },
        { o: 79, h: 88, l: 74, c: 85 },
        { o: 85, h: 94, l: 80, c: 91 },
      ]
    : [
        { o: 80, h: 86, l: 70, c: 74 },
        { o: 74, h: 76, l: 60, c: 63 }, // previous LL = 60
        { o: 63, h: 70, l: 58, c: 67 },
        { o: 67, h: 72, l: 60, c: 68 },
        { o: 68, h: 70, l: 42, c: 46 }, // BOS breaks 60
        { o: 46, h: 50, l: 36, c: 38 },
        { o: 38, h: 42, l: 28, c: 30 },
        { o: 30, h: 33, l: 22, c: 24 },
      ];
  const xs = [48, 100, 156, 208, 268, 334, 400, 464];
  const min = 16, max = 100;
  const bosY = bull ? py(62, min, max) : py(60, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 50, 68, 84]} minP={min} maxP={max} />

      <DashedLine y={bosY} color="#facc15" />
      <SolidLabel x={40} y={bosY - 5} text={bull ? "MÁXIMO PREVIO" : "MÍNIMO PREVIO"} bg="#a16207" color="#fff" size={8} anchor="start" />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <rect x={238} y={bosY - 13} width={58} height={20} fill="#7c3aed" rx="4" />
      <text x={267} y={bosY + 2} textAnchor="middle" fill="#fff" fontSize={11} fontWeight="900">BOS</text>

      <ThickArrow
        x1={258} y1={bosY + (bull ? 4 : -4)}
        x2={258} y2={bull ? bosY - 28 : bosY + 28}
        color={bull ? "#22c55e" : "#ef4444"} id={`bos-arr-${mode}`}
      />
    </svg>
  );
}

function ChartCHoCH({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 82, h: 88, l: 72, c: 75 },
        { o: 75, h: 78, l: 62, c: 65 },
        { o: 65, h: 68, l: 50, c: 53 },
        { o: 53, h: 56, l: 38, c: 42 }, // sweep low
        { o: 42, h: 70, l: 40, c: 67 }, // reversal
        { o: 67, h: 78, l: 63, c: 75 }, // CHoCH
        { o: 75, h: 86, l: 71, c: 83 },
        { o: 83, h: 94, l: 79, c: 91 },
      ]
    : [
        { o: 40, h: 50, l: 36, c: 47 },
        { o: 47, h: 60, l: 44, c: 57 },
        { o: 57, h: 72, l: 54, c: 69 },
        { o: 69, h: 84, l: 66, c: 80 }, // sweep high
        { o: 80, h: 82, l: 56, c: 59 }, // reversal
        { o: 59, h: 62, l: 46, c: 48 }, // CHoCH
        { o: 48, h: 50, l: 36, c: 38 },
        { o: 38, h: 40, l: 26, c: 28 },
      ];
  const xs = [44, 94, 144, 200, 262, 324, 386, 450];
  const min = 22, max = 100;
  const chochY = bull ? py(68, min, max) : py(56, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[32, 50, 68, 84]} minP={min} maxP={max} />

      <DashedLine y={chochY} color="#a78bfa" />
      <SolidLabel x={40} y={chochY - 5} text={bull ? "ÚLTIMO LH (microestructura)" : "ÚLTIMO HL (microestructura)"} bg="#6d28d9" color="#fff" size={7.5} anchor="start" />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <rect x={292} y={chochY - 13} width={72} height={20} fill="#7c3aed" rx="4" />
      <text x={328} y={chochY + 2} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="900">CHoCH</text>

      <SolidLabel x={xs[3]} y={bull ? py(34, min, max) : py(88, min, max)}
        text={bull ? "SWEEP ↓" : "SWEEP ↑"} bg="#c2410c" color="#fff" size={9} />
    </svg>
  );
}

function ChartSupport({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 78, h: 84, l: 66, c: 70 },
        { o: 70, h: 73, l: 54, c: 58 }, // touch
        { o: 58, h: 70, l: 52, c: 68 }, // bounce
        { o: 68, h: 78, l: 64, c: 74 },
        { o: 74, h: 76, l: 56, c: 60 }, // retest
        { o: 60, h: 80, l: 57, c: 77 }, // bounce
        { o: 77, h: 90, l: 73, c: 87 },
        { o: 87, h: 96, l: 82, c: 93 },
      ]
    : [
        { o: 55, h: 60, l: 46, c: 50 },
        { o: 50, h: 55, l: 40, c: 44 },
        { o: 44, h: 54, l: 40, c: 52 }, // fake bounce
        { o: 52, h: 54, l: 40, c: 43 }, // break
        { o: 43, h: 47, l: 28, c: 32 },
        { o: 32, h: 46, l: 30, c: 43 }, // retesteo as resistance
        { o: 43, h: 45, l: 26, c: 29 },
        { o: 29, h: 31, l: 18, c: 20 },
      ];
  const xs = [48, 98, 154, 210, 270, 332, 394, 458];
  const min = 12, max = 100;
  const supY = py(54, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[25, 45, 65, 82]} minP={min} maxP={max} />

      <ZoneBox x1={28} x2={492} y1={supY - 8} y2={supY + 8} color="#22c55e" />
      <SolidLabel x={260} y={supY - 12} text="ZONA DE SOPORTE" bg="#15803d" color="#fff" size={9.5} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      {bull
        ? <>
            <SolidLabel x={xs[1]} y={py(50, min, max)} text="Toca" bg={LABEL_BG} color={LABEL_TEXT} size={7.5} />
            <SolidLabel x={xs[4]} y={py(53, min, max)} text="Retesteo" bg={LABEL_BG} color={LABEL_TEXT} size={7.5} />
            <ThickArrow x1={xs[5]} y1={py(60, min, max)} x2={xs[5]} y2={py(80, min, max)} color="#22c55e" id="sup-arr-bull" />
          </>
        : <>
            <SolidLabel x={xs[3] + 15} y={py(35, min, max)} text="RUPTURA ↓" bg="#b91c1c" color="#fff" size={8} anchor="start" />
            <SolidLabel x={xs[5]} y={py(48, min, max)} text="Ahora RESISTENCIA" bg="#7f1d1d" color="#fca5a5" size={7.5} />
          </>
      }
    </svg>
  );
}

function ChartResistance({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 40, h: 48, l: 36, c: 44 },
        { o: 44, h: 56, l: 41, c: 52 },
        { o: 52, h: 70, l: 49, c: 67 },
        { o: 67, h: 78, l: 63, c: 75 }, // breaks resistance
        { o: 75, h: 82, l: 70, c: 78 },
        { o: 78, h: 80, l: 68, c: 71 }, // retesteo
        { o: 71, h: 86, l: 68, c: 83 },
        { o: 83, h: 95, l: 79, c: 92 },
      ]
    : [
        { o: 48, h: 52, l: 40, c: 50 },
        { o: 50, h: 62, l: 46, c: 58 },
        { o: 58, h: 74, l: 55, c: 70 },
        { o: 70, h: 80, l: 66, c: 68 }, // rejection
        { o: 68, h: 72, l: 54, c: 57 },
        { o: 57, h: 60, l: 42, c: 44 },
        { o: 44, h: 48, l: 32, c: 34 },
        { o: 34, h: 38, l: 24, c: 26 },
      ];
  const xs = [48, 98, 150, 208, 266, 328, 392, 456];
  const min = 18, max = 100;
  const resY = py(73, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 50, 68, 85]} minP={min} maxP={max} />

      <ZoneBox x1={28} x2={492} y1={resY - 8} y2={resY + 8} color="#ef4444" />
      <SolidLabel x={260} y={resY + 22} text="ZONA DE RESISTENCIA" bg="#b91c1c" color="#fff" size={9.5} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      {bull
        ? <>
            <SolidLabel x={xs[3] + 15} y={py(82, min, max)} text="ROMPE ↑" bg="#15803d" color="#fff" size={8} anchor="start" />
            <SolidLabel x={xs[5]} y={py(65, min, max)} text="Retesteo" bg={LABEL_BG} color={LABEL_TEXT} size={7.5} />
            <SolidLabel x={xs[5] + 18} y={py(58, min, max)} text="→ Ahora soporte" bg="#15803d" color="#fff" size={7.5} anchor="start" />
          </>
        : <>
            <SolidLabel x={xs[3]} y={py(85, min, max)} text="RECHAZO ↓" bg="#b91c1c" color="#fff" size={8} />
            <ThickArrow x1={xs[4]} y1={py(68, min, max)} x2={xs[4]} y2={py(45, min, max)} color="#ef4444" id="res-arr-bear" />
          </>
      }
    </svg>
  );
}

function ChartUptrend({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 36, h: 50, l: 33, c: 46 },
        { o: 46, h: 64, l: 42, c: 60 },
        { o: 60, h: 62, l: 50, c: 53 },
        { o: 53, h: 74, l: 50, c: 70 },
        { o: 70, h: 72, l: 60, c: 63 },
        { o: 63, h: 84, l: 60, c: 80 },
        { o: 80, h: 82, l: 70, c: 73 },
        { o: 73, h: 94, l: 70, c: 90 },
      ]
    : [
        { o: 36, h: 50, l: 33, c: 46 },
        { o: 46, h: 64, l: 42, c: 60 },
        { o: 60, h: 62, l: 50, c: 53 },
        { o: 53, h: 74, l: 50, c: 70 },
        { o: 70, h: 72, l: 52, c: 55 }, // fails HL
        { o: 55, h: 58, l: 42, c: 44 }, // breaks below prev HL
        { o: 44, h: 47, l: 32, c: 34 },
        { o: 34, h: 37, l: 24, c: 26 },
      ];
  const xs = [44, 94, 148, 204, 264, 326, 390, 454];
  const min = 20, max = 100;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[32, 52, 70, 87]} minP={min} maxP={max} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      {bull
        ? <>
            <SolidLabel x={xs[1]} y={py(68, min, max)} text="HH1" bg="#15803d" color="#fff" size={8} />
            <SolidLabel x={xs[2]} y={py(47, min, max)} text="HL1" bg="#166534" color="#bbf7d0" size={8} />
            <SolidLabel x={xs[3]} y={py(78, min, max)} text="HH2" bg="#15803d" color="#fff" size={8} />
            <SolidLabel x={xs[4]} y={py(57, min, max)} text="HL2" bg="#166534" color="#bbf7d0" size={8} />
            <SolidLabel x={xs[5]} y={py(88, min, max)} text="HH3" bg="#15803d" color="#fff" size={8} />
            <SolidLabel x={xs[6]} y={py(67, min, max)} text="HL3" bg="#166534" color="#bbf7d0" size={8} />
            <SolidLabel x={xs[7]} y={py(98, min, max)} text="HH4" bg="#15803d" color="#fff" size={8} />
          </>
        : <>
            <SolidLabel x={xs[1]} y={py(68, min, max)} text="HH1" bg="#15803d" color="#fff" size={8} />
            <SolidLabel x={xs[3]} y={py(78, min, max)} text="HH2" bg="#15803d" color="#fff" size={8} />
            <SolidLabel x={xs[4] + 14} y={py(50, min, max)} text="⚠ Pierde HL" bg="#b45309" color="#fff" size={8} anchor="start" />
            <SolidLabel x={xs[5] + 14} y={py(38, min, max)} text="FALLO TENDENCIA" bg="#b91c1c" color="#fff" size={8} anchor="start" />
          </>
      }
    </svg>
  );
}

function ChartDowntrend({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 84, h: 90, l: 74, c: 77 },
        { o: 77, h: 80, l: 62, c: 65 },
        { o: 65, h: 74, l: 60, c: 72 },
        { o: 72, h: 73, l: 50, c: 53 },
        { o: 53, h: 62, l: 48, c: 59 }, // LH breaks down → CHoCH
        { o: 59, h: 78, l: 57, c: 75 },
        { o: 75, h: 88, l: 72, c: 85 },
        { o: 85, h: 96, l: 82, c: 93 },
      ]
    : [
        { o: 84, h: 90, l: 74, c: 78 },
        { o: 78, h: 80, l: 62, c: 65 }, // LL1, LH1
        { o: 65, h: 74, l: 60, c: 71 },
        { o: 71, h: 73, l: 52, c: 55 }, // LL2
        { o: 55, h: 62, l: 50, c: 58 }, // LH2
        { o: 58, h: 60, l: 38, c: 41 }, // LL3
        { o: 41, h: 48, l: 36, c: 44 }, // LH3
        { o: 44, h: 46, l: 26, c: 28 }, // LL4
      ];
  const xs = [44, 96, 150, 206, 264, 326, 388, 452];
  const min = 18, max = 96;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 50, 68, 84]} minP={min} maxP={max} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      {!bull
        ? <>
            <SolidLabel x={xs[0]} y={py(94, min, max)} text="LH1" bg="#7f1d1d" color="#fca5a5" size={8} />
            <SolidLabel x={xs[1]} y={py(58, min, max)} text="LL1" bg="#b91c1c" color="#fff" size={8} />
            <SolidLabel x={xs[2]} y={py(75, min, max)} text="LH2" bg="#7f1d1d" color="#fca5a5" size={8} />
            <SolidLabel x={xs[3]} y={py(48, min, max)} text="LL2" bg="#b91c1c" color="#fff" size={8} />
            <SolidLabel x={xs[4]} y={py(63, min, max)} text="LH3" bg="#7f1d1d" color="#fca5a5" size={8} />
            <SolidLabel x={xs[5]} y={py(34, min, max)} text="LL3" bg="#b91c1c" color="#fff" size={8} />
          </>
        : <>
            <SolidLabel x={xs[3] + 14} y={py(48, min, max)} text="LL2" bg="#b91c1c" color="#fff" size={8} anchor="start" />
            <SolidLabel x={xs[4] + 14} y={py(55, min, max)} text="LH falla → CHoCH" bg="#7c3aed" color="#fff" size={7.5} anchor="start" />
            <ThickArrow x1={xs[5]} y1={py(65, min, max)} x2={xs[5]} y2={py(84, min, max)} color="#22c55e" id="dt-arr-bull" />
          </>
      }
    </svg>
  );
}

function ChartRange({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = [
    { o: 56, h: 74, l: 52, c: 70 },
    { o: 70, h: 76, l: 58, c: 62 },
    { o: 62, h: 68, l: 50, c: 54 },
    { o: 54, h: 68, l: 50, c: 65 },
    { o: 65, h: 77, l: 60, c: 71 },
    { o: 71, h: 78, l: 54, c: 58 },
    { o: 58, h: 66, l: 50, c: 63 },
    { o: 63, h: 75, l: 58, c: 72 },
  ];
  const xs = [44, 98, 152, 208, 264, 322, 380, 438];
  const min = 30, max = 96;
  const ceilY = py(76, min, max);
  const floorY = py(50, min, max);
  const centerY = (ceilY + floorY) / 2;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />

      <rect x={28} y={ceilY} width={464} height={floorY - ceilY} fill="#818cf8" opacity="0.06" />

      <DashedLine y={ceilY} color="#ef4444" />
      <SolidLabel x={40} y={ceilY - 6} text="RESISTENCIA (TECHO)" bg="#b91c1c" color="#fff" size={8.5} anchor="start" />

      <DashedLine y={floorY} color="#22c55e" />
      <SolidLabel x={40} y={floorY + 16} text="SOPORTE (PISO)" bg="#15803d" color="#fff" size={8.5} anchor="start" />

      <rect x={28} y={centerY - 14} width={464} height={28} fill="#f59e0b" opacity="0.07" />
      <SolidLabel x={260} y={centerY + 4} text="⚠ CENTRO — BAJA VENTAJA" bg="#b45309" color="#fff" size={8.5} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <ThickArrow
        x1={460} y1={bull ? floorY - 6 : ceilY + 6}
        x2={460} y2={bull ? ceilY + 6 : floorY - 6}
        color={bull ? "#22c55e" : "#ef4444"} id={`range-arr-${mode}`}
      />
      <SolidLabel x={475} y={(ceilY + floorY) / 2 + 4}
        text={bull ? "COMPRA\nEN PISO" : "VENTA\nEN TECHO"}
        bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={7.5} anchor="start" />
    </svg>
  );
}

function ChartPullback({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 36, h: 48, l: 33, c: 44 },
        { o: 44, h: 74, l: 42, c: 70 }, // impulse
        { o: 70, h: 72, l: 58, c: 61 },
        { o: 61, h: 64, l: 52, c: 55 },
        { o: 55, h: 60, l: 50, c: 57 }, // pullback end
        { o: 57, h: 82, l: 55, c: 79 }, // resume
        { o: 79, h: 92, l: 75, c: 89 },
        { o: 89, h: 98, l: 84, c: 95 },
      ]
    : [
        { o: 90, h: 96, l: 80, c: 84 },
        { o: 84, h: 86, l: 56, c: 60 }, // drop
        { o: 60, h: 74, l: 57, c: 71 },
        { o: 71, h: 76, l: 64, c: 68 },
        { o: 68, h: 73, l: 62, c: 65 }, // pullback end
        { o: 65, h: 67, l: 42, c: 46 }, // resume
        { o: 46, h: 48, l: 34, c: 36 },
        { o: 36, h: 38, l: 24, c: 26 },
      ];
  const xs = [44, 98, 152, 208, 264, 326, 390, 454];
  const min = 20, max = 100;
  const pbTop = bull ? py(70, min, max) : py(76, min, max);
  const pbBot = bull ? py(50, min, max) : py(62, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 50, 70, 88]} minP={min} maxP={max} />

      <ZoneBox x1={124} x2={298} y1={pbTop} y2={pbBot} color={bull ? "#22c55e" : "#ef4444"} />
      <SolidLabel x={210} y={(pbTop + pbBot) / 2 + 4} text="ZONA DE PULLBACK" bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8.5} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[4]} y={bull ? py(46, min, max) : py(79, min, max)} text="ENTRADA" bg="#a16207" color="#fff" size={8} />
      <ThickArrow
        x1={xs[5]} y1={bull ? py(65, min, max) : py(62, min, max)}
        x2={xs[5]} y2={bull ? py(84, min, max) : py(40, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`pb-arr-${mode}`}
      />
    </svg>
  );
}

function ChartRetest({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 40, h: 52, l: 37, c: 48 },
        { o: 48, h: 65, l: 45, c: 62 },
        { o: 62, h: 82, l: 60, c: 78 }, // breaks 65
        { o: 78, h: 86, l: 72, c: 81 },
        { o: 81, h: 83, l: 63, c: 67 }, // retesteo
        { o: 67, h: 70, l: 63, c: 68 },
        { o: 68, h: 86, l: 66, c: 83 }, // bounce
        { o: 83, h: 96, l: 80, c: 93 },
      ]
    : [
        { o: 80, h: 86, l: 68, c: 72 },
        { o: 72, h: 74, l: 58, c: 62 },
        { o: 62, h: 63, l: 42, c: 46 }, // breaks 58
        { o: 46, h: 50, l: 38, c: 42 },
        { o: 42, h: 60, l: 40, c: 57 }, // retesteo
        { o: 57, h: 59, l: 55, c: 56 },
        { o: 56, h: 58, l: 36, c: 40 }, // rejection
        { o: 40, h: 42, l: 28, c: 30 },
      ];
  const xs = [44, 96, 152, 210, 272, 330, 392, 456];
  const min = 20, max = 100;
  const levelY = bull ? py(65, min, max) : py(58, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[32, 52, 70, 86]} minP={min} maxP={max} />

      <DashedLine y={levelY} color={bull ? "#22c55e" : "#ef4444"} />
      <SolidLabel x={36} y={levelY - 6} text={bull ? "RESISTENCIA ROTA → SOPORTE" : "SOPORTE ROTO → RESISTENCIA"} bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} anchor="start" />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <rect x={240} y={levelY - 14} width={82} height={20} fill="#7c3aed" rx="4" />
      <text x={281} y={levelY + 2} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="900">RETESTEO</text>

      <ThickArrow
        x1={xs[6]} y1={bull ? py(70, min, max) : py(52, min, max)}
        x2={xs[6]} y2={bull ? py(86, min, max) : py(36, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`ret-arr-${mode}`}
      />
    </svg>
  );
}

function ChartStopLoss({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 46, h: 55, l: 42, c: 51 },
        { o: 51, h: 64, l: 48, c: 60 },
        { o: 60, h: 68, l: 54, c: 65 }, // OB zone
        { o: 65, h: 72, l: 60, c: 68 }, // entry
        { o: 68, h: 84, l: 66, c: 81 },
        { o: 81, h: 92, l: 77, c: 89 },
        { o: 89, h: 97, l: 85, c: 94 },
        { o: 94, h: 99, l: 89, c: 96 },
      ]
    : [
        { o: 86, h: 92, l: 78, c: 82 },
        { o: 82, h: 84, l: 70, c: 74 },
        { o: 74, h: 80, l: 64, c: 67 }, // OB
        { o: 67, h: 70, l: 56, c: 58 }, // entry
        { o: 58, h: 62, l: 42, c: 45 },
        { o: 45, h: 48, l: 33, c: 35 },
        { o: 35, h: 38, l: 25, c: 27 },
        { o: 27, h: 30, l: 18, c: 20 },
      ];
  const xs = [44, 96, 150, 210, 276, 340, 404, 464];
  const min = 10, max = 106;
  const entryY = bull ? py(67, min, max) : py(68, min, max);
  const stopY = bull ? py(48, min, max) : py(83, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[25, 45, 65, 85]} minP={min} maxP={max} />

      <DashedLine y={entryY} color="#facc15" />
      <SolidLabel x={36} y={entryY - 6} text="ENTRADA" bg="#a16207" color="#fff" size={8.5} anchor="start" />

      <rect x={28} y={Math.min(entryY, stopY)} width={464} height={Math.abs(entryY - stopY)} fill="#ef4444" opacity="0.1" />
      <DashedLine y={stopY} color="#ef4444" />
      <SolidLabel x={36} y={stopY + 16} text="STOP LOSS" bg="#b91c1c" color="#fff" size={8.5} anchor="start" />
      <SolidLabel x={260} y={(entryY + stopY) / 2 + 4} text="ZONA DE RIESGO (INVALIDACIÓN)" bg="#7f1d1d" color="#fca5a5" size={8} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}
    </svg>
  );
}

function ChartTakeProfit({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 36, h: 46, l: 32, c: 42 },
        { o: 42, h: 54, l: 39, c: 50 },
        { o: 50, h: 58, l: 46, c: 55 }, // entry
        { o: 55, h: 74, l: 52, c: 70 },
        { o: 70, h: 82, l: 66, c: 79 },
        { o: 79, h: 90, l: 75, c: 86 }, // TP1
        { o: 86, h: 92, l: 82, c: 88 },
        { o: 88, h: 98, l: 84, c: 95 }, // TP2
      ]
    : [
        { o: 94, h: 99, l: 86, c: 90 },
        { o: 90, h: 92, l: 78, c: 82 },
        { o: 82, h: 85, l: 73, c: 76 }, // entry
        { o: 76, h: 78, l: 60, c: 63 },
        { o: 63, h: 66, l: 50, c: 52 },
        { o: 52, h: 55, l: 42, c: 44 }, // TP1
        { o: 44, h: 47, l: 36, c: 38 },
        { o: 38, h: 40, l: 28, c: 30 }, // TP2
      ];
  const xs = [44, 94, 148, 204, 264, 326, 390, 456];
  const min = 20, max = 100;
  const entryY = bull ? py(54, min, max) : py(82, min, max);
  const tp1Y = bull ? py(84, min, max) : py(45, min, max);
  const tp2Y = bull ? py(96, min, max) : py(30, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 52, 70, 88]} minP={min} maxP={max} />

      <DashedLine y={entryY} color="#facc15" />
      <SolidLabel x={36} y={entryY - 6} text="ENTRADA" bg="#a16207" color="#fff" size={8.5} anchor="start" />
      <DashedLine y={tp1Y} color="#86efac" />
      <SolidLabel x={36} y={tp1Y - 6} text="TP1 — PARCIAL" bg="#166534" color="#fff" size={8} anchor="start" />
      <DashedLine y={tp2Y} color="#22c55e" />
      <SolidLabel x={36} y={tp2Y - 6} text="TP2 — FINAL" bg="#14532d" color="#fff" size={8} anchor="start" />

      <rect x={300} y={Math.min(entryY, tp1Y)} width={180} height={Math.abs(entryY - tp1Y)} fill="#22c55e" opacity="0.08" />
      <rect x={300} y={Math.min(tp1Y, tp2Y)} width={180} height={Math.abs(tp1Y - tp2Y)} fill="#15803d" opacity="0.08" />

      <text x={400} y={(entryY + tp1Y) / 2 + 4} textAnchor="middle" fill="#22c55e" fontSize={11} fontWeight="900">1R</text>
      <text x={400} y={(tp1Y + tp2Y) / 2 + 4} textAnchor="middle" fill="#15803d" fontSize={11} fontWeight="900">2R</text>

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}
    </svg>
  );
}

function ChartRiskReward({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 40, h: 52, l: 37, c: 48 },
        { o: 48, h: 60, l: 44, c: 56 },
        { o: 56, h: 64, l: 50, c: 60 }, // entry
        { o: 60, h: 78, l: 58, c: 74 },
        { o: 74, h: 88, l: 70, c: 85 },
        { o: 85, h: 96, l: 81, c: 93 },
        { o: 93, h: 99, l: 88, c: 96 },
        { o: 96, h: 100, l: 92, c: 98 },
      ]
    : [
        { o: 92, h: 98, l: 84, c: 88 },
        { o: 88, h: 90, l: 76, c: 80 },
        { o: 80, h: 82, l: 70, c: 73 }, // entry
        { o: 73, h: 75, l: 56, c: 59 },
        { o: 59, h: 62, l: 46, c: 48 },
        { o: 48, h: 50, l: 36, c: 38 },
        { o: 38, h: 40, l: 28, c: 30 },
        { o: 30, h: 32, l: 20, c: 22 },
      ];
  const xs = [44, 96, 150, 208, 268, 330, 392, 454];
  const min = 10, max = 106;

  const entryY = bull ? py(60, min, max) : py(76, min, max);
  const stopY = bull ? py(44, min, max) : py(86, min, max);
  const tp1Y = bull ? py(80, min, max) : py(56, min, max);
  const tp2Y = bull ? py(100, min, max) : py(26, min, max);
  const risk = Math.abs(entryY - stopY);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[20, 42, 62, 82]} minP={min} maxP={max} />

      <DashedLine y={stopY} color="#ef4444" />
      <SolidLabel x={36} y={stopY + (bull ? 14 : -6)} text="SL" bg="#b91c1c" color="#fff" size={8.5} anchor="start" />
      <DashedLine y={entryY} color="#facc15" />
      <SolidLabel x={36} y={entryY - 6} text="ENTRY" bg="#a16207" color="#fff" size={8.5} anchor="start" />
      <DashedLine y={tp1Y} color="#86efac" />
      <SolidLabel x={36} y={tp1Y - 6} text="TP1  1R" bg="#166534" color="#fff" size={8} anchor="start" />
      <DashedLine y={tp2Y} color="#22c55e" />
      <SolidLabel x={36} y={tp2Y - 6} text="TP2  2R" bg="#14532d" color="#fff" size={8} anchor="start" />

      <rect x={464} y={Math.min(entryY, stopY)} width={14} height={risk} fill="#ef4444" opacity="0.7" rx="2" />
      <text x={484} y={(entryY + stopY) / 2 + 4} fill="#ef4444" fontSize={10} fontWeight="900">1R</text>

      <rect x={464} y={Math.min(entryY, tp2Y)} width={14} height={Math.abs(entryY - tp2Y)} fill="#22c55e" opacity="0.4" rx="2" />
      <text x={484} y={(entryY + tp2Y) / 2 + 4} fill="#22c55e" fontSize={10} fontWeight="900">2R</text>

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}
    </svg>
  );
}

function ChartRiskManagement({ mode }: { mode: "bullish" | "bearish" }) {
  const good = [100, 101, 99, 103, 106, 104, 108, 112, 110, 116, 114, 120];
  const bad  = [100, 110, 90, 115, 76, 100, 60, 85, 42, 68, 28, 50];
  const padL = 40, padT = 22, padB = 36, w = 500, h = 210;
  const maxV = 128, minV = 22;

  const scX = (i: number) => padL + (i / (good.length - 1)) * (w - padL - 20);
  const scY = (v: number) => padT + ((maxV - v) / (maxV - minV)) * (h - padT - padB);

  const goodPath = good.map((v, i) => `${i === 0 ? "M" : "L"}${scX(i)},${scY(v)}`).join(" ");
  const badPath  = bad.map((v, i) => `${i === 0 ? "M" : "L"}${scX(i)},${scY(v)}`).join(" ");

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      {[40, 60, 80, 100, 120].map(v => (
        <g key={v}>
          <line x1={padL} y1={scY(v)} x2={w} y2={scY(v)} stroke={GRID} strokeWidth="1" />
          <text x={36} y={scY(v) + 4} fill="#4a5568" fontSize={8} textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={padL} y1={scY(100)} x2={w} y2={scY(100)} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4" />

      <path d={badPath} fill="none" stroke="#ef4444" strokeWidth="2.5" opacity="0.8" />
      {bad.map((v, i) => <circle key={i} cx={scX(i)} cy={scY(v)} r="4" fill={v >= 100 ? "#ef4444" : "#7f1d1d"} />)}

      <path d={goodPath} fill="none" stroke="#22c55e" strokeWidth="3" />
      {good.map((v, i) => <circle key={i} cx={scX(i)} cy={scY(v)} r="4" fill="#22c55e" />)}

      <SolidLabel x={scX(11) + 14} y={scY(good[11]) - 6} text="Riesgo fijo 1%" bg="#15803d" color="#fff" size={8.5} anchor="start" />
      <SolidLabel x={scX(11) + 14} y={scY(bad[11]) + 16} text="Sin gestión" bg="#b91c1c" color="#fff" size={8.5} anchor="start" />
    </svg>
  );
}

function ChartSessions({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = [
    { o: 55, h: 60, l: 51, c: 57 },
    { o: 57, h: 62, l: 52, c: 55 },
    { o: 55, h: 60, l: 50, c: 57 },
    { o: 57, h: 63, l: bull ? 44 : 68, c: bull ? 48 : 64 }, // London sweep
    { o: bull ? 48 : 64, h: bull ? 70 : 66, l: bull ? 46 : 56, c: bull ? 66 : 59 },
    { o: bull ? 66 : 59, h: bull ? 84 : 61, l: bull ? 63 : 44, c: bull ? 81 : 47 }, // NY impulse
    { o: bull ? 81 : 47, h: bull ? 93 : 49, l: bull ? 77 : 36, c: bull ? 90 : 39 },
    { o: bull ? 90 : 39, h: bull ? 98 : 41, l: bull ? 85 : 30, c: bull ? 95 : 33 },
  ];
  const xs = [54, 100, 146, 218, 274, 342, 398, 456];
  const min = 22, max = 102;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />

      <rect x={28} y={18} width={158} height={210} fill="#3b82f6" opacity="0.05" />
      <rect x={186} y={18} width={124} height={210} fill="#f59e0b" opacity="0.05" />
      <rect x={310} y={18} width={202} height={210} fill="#22c55e" opacity="0.05" />

      <SolidLabel x={107} y={34} text="🌏 ASIA" bg="#1e3a8a" color="#93c5fd" size={9} />
      <SolidLabel x={248} y={34} text="🇬🇧 LONDON" bg="#78350f" color="#fde68a" size={9} />
      <SolidLabel x={411} y={34} text="🇺🇸 NY" bg="#14532d" color="#86efac" size={9} />

      <line x1={186} y1={18} x2={186} y2={228} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />
      <line x1={310} y1={18} x2={310} y2={228} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5" />

      <ZoneBox x1={30} x2={180} y1={py(62, min, max)} y2={py(50, min, max)} color="#3b82f6" />
      <SolidLabel x={107} y={py(56, min, max) + 4} text="RANGO ASIA" bg="#1e3a8a" color="#93c5fd" size={8} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[3]} y={bull ? py(40, min, max) : py(72, min, max)}
        text={bull ? "SWEEP ↓" : "SWEEP ↑"} bg="#c2410c" color="#fff" size={8.5} />
    </svg>
  );
}

function ChartVolume({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 46, h: 54, l: 42, c: 50 },
        { o: 50, h: 58, l: 46, c: 54 },
        { o: 54, h: 62, l: 50, c: 58 },
        { o: 58, h: 66, l: 54, c: 62 },
        { o: 62, h: 92, l: 60, c: 88 }, // high volume impulse
        { o: 88, h: 96, l: 82, c: 91 },
        { o: 91, h: 98, l: 86, c: 94 },
        { o: 94, h: 99, l: 89, c: 96 },
      ]
    : [
        { o: 78, h: 84, l: 70, c: 74 },
        { o: 74, h: 78, l: 64, c: 68 },
        { o: 68, h: 72, l: 60, c: 64 },
        { o: 64, h: 67, l: 56, c: 60 },
        { o: 60, h: 62, l: 34, c: 38 }, // high volume drop
        { o: 38, h: 42, l: 28, c: 31 },
        { o: 31, h: 34, l: 22, c: 25 },
        { o: 25, h: 28, l: 18, c: 20 },
      ];
  const vols = bull ? [10, 12, 11, 13, 52, 20, 18, 22] : [12, 11, 13, 12, 56, 20, 18, 16];
  const xs = [50, 98, 146, 194, 252, 312, 372, 432];
  const min = 14, max = 100;
  const chartB = 168;
  const volMax = 60;

  const scY = (p: number) => py(p, min, max, 22, chartB);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      {[30, 50, 70, 88].map(p => (
        <line key={p} x1={28} y1={scY(p)} x2={492} y2={scY(p)} stroke={GRID} strokeWidth="1" />
      ))}
      <line x1={28} y1={174} x2={492} y2={174} stroke={GRID} strokeWidth="1.5" />

      {vols.map((v, i) => {
        const barH = (v / volMax) * 64;
        return (
          <rect key={i} x={xs[i] - 8} y={242 - barH} width={16} height={barH}
            fill={v > 30 ? (bull ? "#22c55e" : "#ef4444") : "#334155"} opacity="0.85" rx="1" />
        );
      })}
      <text x={36} y={245} fill="#475569" fontSize={8} fontWeight="700">VOL</text>

      {candles.map((c, i) => {
        const b = c.c >= c.o;
        const bodyTop = Math.min(scY(c.o), scY(c.c));
        const bodyH = Math.max(3, Math.abs(scY(c.o) - scY(c.c)));
        return (
          <g key={i}>
            <line x1={xs[i]} y1={scY(c.h)} x2={xs[i]} y2={scY(c.l)} stroke={b ? BULL_WICK : BEAR_WICK} strokeWidth="2" />
            <rect x={xs[i] - 7} y={bodyTop} width={14} height={bodyH} fill={b ? BULL_BODY : BEAR_BODY} rx="1.5" />
          </g>
        );
      })}

      <SolidLabel x={xs[4]} y={scY(bull ? 96 : 30)}
        text={bull ? "VOLUMEN FUERTE ↑" : "VOLUMEN FUERTE ↓"}
        bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8.5} />
    </svg>
  );
}

function ChartManipulation({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 66, h: 72, l: 58, c: 62 },
        { o: 62, h: 68, l: 56, c: 60 },
        { o: 60, h: 66, l: 54, c: 63 },
        { o: 63, h: 65, l: 42, c: 48 }, // FAKE BREAK
        { o: 48, h: 80, l: 46, c: 76 }, // reversal
        { o: 76, h: 88, l: 72, c: 85 },
        { o: 85, h: 94, l: 81, c: 91 },
        { o: 91, h: 98, l: 87, c: 95 },
      ]
    : [
        { o: 52, h: 58, l: 46, c: 55 },
        { o: 55, h: 62, l: 51, c: 59 },
        { o: 59, h: 64, l: 54, c: 62 },
        { o: 62, h: 84, l: 60, c: 78 }, // FAKE BREAK
        { o: 78, h: 80, l: 50, c: 54 }, // reversal
        { o: 54, h: 56, l: 40, c: 42 },
        { o: 42, h: 44, l: 30, c: 32 },
        { o: 32, h: 34, l: 22, c: 24 },
      ];
  const xs = [44, 94, 144, 200, 264, 328, 392, 456];
  const min = 20, max = 100;
  const levelY = bull ? py(55, min, max) : py(63, min, max);
  const fakeY  = bull ? py(42, min, max) : py(84, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[32, 52, 70, 86]} minP={min} maxP={max} />

      <DashedLine y={levelY} color="#facc15" />
      <SolidLabel x={36} y={levelY - 6} text={bull ? "NIVEL OBVIO (MÍNIMOS)" : "NIVEL OBVIO (MÁXIMOS)"} bg="#a16207" color="#fff" size={8} anchor="start" />

      <rect x={172} y={Math.min(levelY, fakeY) - 3} width={72} height={Math.abs(levelY - fakeY) + 6} fill="#ef4444" opacity="0.12" />
      <SolidLabel x={208} y={(levelY + fakeY) / 2 + 4} text="FAKE BREAK" bg="#b91c1c" color="#fff" size={8} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[3]} y={bull ? fakeY - 8 : fakeY + 16}
        text={bull ? "TRAMPA BAJISTA" : "TRAMPA ALCISTA"} bg="#7f1d1d" color="#fca5a5" size={8} />

      <ThickArrow
        x1={xs[4] - 5} y1={bull ? py(52, min, max) : py(75, min, max)}
        x2={xs[4] + 28} y2={bull ? py(82, min, max) : py(46, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`manip-arr-${mode}`}
      />
      <SolidLabel x={xs[4] + 34} y={bull ? py(86, min, max) : py(42, min, max)}
        text={bull ? "GIRO VIOLENTO ↑" : "GIRO VIOLENTO ↓"}
        bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} anchor="start" />
    </svg>
  );
}

function ChartSweep({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 64, h: 72, l: 58, c: 68 },
        { o: 68, h: 74, l: 57, c: 62 },
        { o: 62, h: 68, l: 56, c: 65 },
        { o: 65, h: 67, l: 46, c: 56 }, // SWEEP — long wick
        { o: 56, h: 76, l: 54, c: 73 }, // reversal
        { o: 73, h: 86, l: 70, c: 83 },
        { o: 83, h: 94, l: 79, c: 91 },
        { o: 91, h: 98, l: 87, c: 95 },
      ]
    : [
        { o: 50, h: 58, l: 46, c: 54 },
        { o: 54, h: 62, l: 50, c: 58 },
        { o: 58, h: 64, l: 52, c: 60 },
        { o: 60, h: 78, l: 58, c: 64 }, // SWEEP — long wick up
        { o: 64, h: 66, l: 46, c: 50 }, // reversal
        { o: 50, h: 52, l: 36, c: 38 },
        { o: 38, h: 40, l: 28, c: 30 },
        { o: 30, h: 32, l: 20, c: 22 },
      ];
  const xs = [44, 94, 144, 200, 262, 326, 390, 454];
  const min = 20, max = 100;
  const levelY = bull ? py(57, min, max) : py(63, min, max);
  const sweepExtY = bull ? py(46, min, max) : py(78, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 50, 68, 84]} minP={min} maxP={max} />

      <DashedLine y={levelY} color="#facc15" />
      <SolidLabel x={36} y={levelY - 6} text={bull ? "EQUAL LOWS (stops aquí)" : "EQUAL HIGHS (stops aquí)"} bg="#a16207" color="#fff" size={8} anchor="start" />

      <ZoneBox x1={172} x2={238} y1={Math.min(levelY, sweepExtY) - 3} y2={Math.max(levelY, sweepExtY) + 3} color="#f97316" />
      <SolidLabel x={204} y={(levelY + sweepExtY) / 2 + 4} text="SWEEP" bg="#c2410c" color="#fff" size={9} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <ThickArrow
        x1={xs[4] + 8} y1={bull ? py(60, min, max) : py(62, min, max)}
        x2={xs[4] + 8} y2={bull ? py(82, min, max) : py(42, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`sw-arr-${mode}`}
      />
      <SolidLabel x={xs[4] + 22} y={bull ? py(80, min, max) : py(44, min, max)}
        text="GIRO TRAS SWEEP" bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} anchor="start" />
    </svg>
  );
}

function ChartInstitutional({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 66, h: 73, l: 58, c: 62 },
        { o: 62, h: 68, l: 56, c: 60 },
        { o: 60, h: 62, l: 42, c: 48 }, // ① sweep
        { o: 48, h: 78, l: 46, c: 74 }, // ② CHoCH
        { o: 74, h: 76, l: 56, c: 60 }, // ③ retrace to FVG
        { o: 60, h: 65, l: 57, c: 63 }, // ④ in FVG → entry
        { o: 63, h: 86, l: 61, c: 83 }, // ⑤ impulse
        { o: 83, h: 96, l: 80, c: 93 },
      ]
    : [
        { o: 54, h: 61, l: 48, c: 58 },
        { o: 58, h: 65, l: 53, c: 62 },
        { o: 62, h: 80, l: 60, c: 76 }, // ① sweep
        { o: 76, h: 78, l: 48, c: 52 }, // ② CHoCH
        { o: 52, h: 70, l: 50, c: 67 }, // ③ retrace to FVG
        { o: 67, h: 69, l: 62, c: 64 }, // ④ in FVG → entry
        { o: 64, h: 66, l: 42, c: 46 }, // ⑤ impulse
        { o: 46, h: 48, l: 30, c: 34 },
      ];
  const xs = [38, 86, 134, 192, 252, 312, 372, 434];
  const min = 20, max = 98;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[30, 50, 68, 84]} minP={min} maxP={max} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[1]} y={bull ? py(52, min, max) : py(68, min, max)} text="① Liquidez" bg="#a16207" color="#fff" size={7.5} />
      <SolidLabel x={xs[2]} y={bull ? py(38, min, max) : py(84, min, max)} text="② Sweep" bg="#c2410c" color="#fff" size={7.5} />
      <SolidLabel x={xs[3]} y={bull ? py(82, min, max) : py(44, min, max)} text="③ CHoCH" bg="#6d28d9" color="#fff" size={7.5} />

      <ZoneBox
        x1={xs[4] - 16} x2={xs[5] + 16}
        y1={bull ? py(76, min, max) : py(70, min, max)}
        y2={bull ? py(56, min, max) : py(50, min, max)}
        color="#818cf8"
      />
      <SolidLabel x={(xs[4] + xs[5]) / 2} y={bull ? py(66, min, max) : py(60, min, max)} text="④ FVG/OB" bg="#4338ca" color="#fff" size={8} />

      <SolidLabel x={xs[6] + 18} y={bull ? py(90, min, max) : py(38, min, max)}
        text="⑤ ENTRADA" bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} anchor="start" />
    </svg>
  );
}

function ChartConfirmation({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 64, h: 72, l: 56, c: 60 },
        { o: 60, h: 66, l: 48, c: 53 }, // touches zone, wick
        { o: 53, h: 56, l: 46, c: 52 }, // indecision
        { o: 52, h: 76, l: 50, c: 73 }, // CONFIRMATION: engulfing
        { o: 73, h: 84, l: 69, c: 81 },
        { o: 81, h: 92, l: 77, c: 89 },
        { o: 89, h: 97, l: 84, c: 94 },
        { o: 94, h: 100, l: 90, c: 97 },
      ]
    : [
        { o: 50, h: 58, l: 44, c: 54 },
        { o: 54, h: 72, l: 52, c: 68 }, // touches zone, wick
        { o: 68, h: 70, l: 64, c: 66 }, // indecision
        { o: 66, h: 68, l: 44, c: 48 }, // CONFIRMATION: bearish engulfing
        { o: 48, h: 51, l: 34, c: 36 },
        { o: 36, h: 39, l: 24, c: 26 },
        { o: 26, h: 28, l: 16, c: 18 },
        { o: 18, h: 20, l: 10, c: 12 },
      ];
  const xs = [44, 96, 152, 214, 276, 338, 400, 462];
  const min = 8, max = 102;
  const zoneTop = bull ? py(58, min, max) : py(72, min, max);
  const zoneBt  = bull ? py(46, min, max) : py(62, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[20, 42, 62, 80]} minP={min} maxP={max} />

      <ZoneBox x1={28} x2={492} y1={zoneTop} y2={zoneBt} color={bull ? "#22c55e" : "#ef4444"} />
      <SolidLabel x={260} y={zoneTop - 8} text={bull ? "ZONA DE DEMANDA" : "ZONA DE OFERTA"} bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={9} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <rect x={xs[3] - 12} y={py(bull ? 76 : 68, min, max) - 4} width={24}
        height={Math.abs(py(bull ? 50 : 44, min, max) - py(bull ? 76 : 68, min, max)) + 8}
        fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4 3" rx="3" />
      <SolidLabel x={xs[3]} y={bull ? py(82, min, max) : py(38, min, max)} text="CONFIRMACIÓN" bg="#a16207" color="#fff" size={8} />
    </svg>
  );
}

function ChartImpulse({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 38, h: 46, l: 34, c: 42 },
        { o: 42, h: 52, l: 38, c: 48 },
        { o: 48, h: 58, l: 44, c: 54 },
        { o: 54, h: 94, l: 52, c: 90 }, // IMPULSE
        { o: 90, h: 99, l: 86, c: 96 }, // IMPULSE 2
        { o: 96, h: 100, l: 90, c: 93 },
        { o: 93, h: 98, l: 88, c: 95 },
        { o: 95, h: 100, l: 91, c: 98 },
      ]
    : [
        { o: 90, h: 96, l: 84, c: 88 },
        { o: 88, h: 90, l: 80, c: 84 },
        { o: 84, h: 86, l: 76, c: 80 },
        { o: 80, h: 82, l: 40, c: 44 }, // IMPULSE
        { o: 44, h: 47, l: 32, c: 35 }, // IMPULSE 2
        { o: 35, h: 38, l: 26, c: 28 },
        { o: 28, h: 30, l: 20, c: 22 },
        { o: 22, h: 24, l: 14, c: 16 },
      ];
  const xs = [44, 94, 148, 204, 268, 330, 392, 454];
  const min = 10, max = 102;
  const fvgTop = bull ? py(90, min, max) : py(56, min, max);
  const fvgBot = bull ? py(58, min, max) : py(82, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[22, 46, 68, 88]} minP={min} maxP={max} />

      <ZoneBox x1={xs[3] - 14} x2={xs[4] + 14} y1={fvgTop} y2={fvgBot} color="#818cf8" />
      <SolidLabel x={(xs[3] + xs[4]) / 2} y={(fvgTop + fvgBot) / 2 + 4} text="FVG" bg="#4338ca" color="#fff" size={9} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[3]} y={bull ? py(98, min, max) : py(36, min, max)}
        text="IMPULSO" bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={10} />
    </svg>
  );
}

function ChartCorrection({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 34, h: 74, l: 32, c: 70 }, // impulse
        { o: 70, h: 72, l: 58, c: 61 },
        { o: 61, h: 64, l: 50, c: 53 },
        { o: 53, h: 58, l: 48, c: 55 }, // correction end
        { o: 55, h: 82, l: 53, c: 78 }, // resume
        { o: 78, h: 90, l: 74, c: 87 },
        { o: 87, h: 97, l: 83, c: 94 },
        { o: 94, h: 100, l: 89, c: 97 },
      ]
    : [
        { o: 92, h: 94, l: 54, c: 58 }, // impulse
        { o: 58, h: 72, l: 56, c: 69 },
        { o: 69, h: 76, l: 63, c: 73 },
        { o: 73, h: 78, l: 66, c: 71 }, // correction end
        { o: 71, h: 73, l: 44, c: 48 }, // resume
        { o: 48, h: 51, l: 36, c: 38 },
        { o: 38, h: 41, l: 26, c: 28 },
        { o: 28, h: 31, l: 18, c: 20 },
      ];
  const xs = [44, 98, 154, 210, 270, 332, 394, 458];
  const min = 14, max = 100;
  const corrTop = bull ? py(72, min, max) : py(78, min, max);
  const corrBot = bull ? py(48, min, max) : py(56, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[24, 46, 66, 84]} minP={min} maxP={max} />

      <ZoneBox x1={xs[1] - 18} x2={xs[3] + 18} y1={corrTop} y2={corrBot} color="#f59e0b" />
      <SolidLabel x={(xs[1] + xs[3]) / 2} y={(corrTop + corrBot) / 2 + 4} text="RETROCESO" bg="#b45309" color="#fff" size={9} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[0]} y={bull ? py(78, min, max) : py(50, min, max)}
        text="Impulso" bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} />
      <SolidLabel x={xs[4] + 16} y={bull ? py(85, min, max) : py(40, min, max)}
        text={bull ? "Continúa ↑" : "Continúa ↓"}
        bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={8} anchor="start" />
    </svg>
  );
}

function ChartAccumulation({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const candles: CandleData[] = bull
    ? [
        { o: 78, h: 84, l: 64, c: 68 },
        { o: 68, h: 70, l: 58, c: 61 },
        { o: 61, h: 70, l: 50, c: 66 },
        { o: 66, h: 72, l: 52, c: 56 },
        { o: 56, h: 58, l: 42, c: 46 }, // sweep below range
        { o: 46, h: 68, l: 44, c: 64 }, // absorption
        { o: 64, h: 76, l: 61, c: 73 }, // breakout
        { o: 73, h: 92, l: 70, c: 89 }, // expansion
      ]
    : [
        { o: 44, h: 52, l: 38, c: 49 },
        { o: 49, h: 62, l: 46, c: 58 },
        { o: 58, h: 70, l: 52, c: 66 },
        { o: 66, h: 74, l: 58, c: 62 },
        { o: 62, h: 80, l: 60, c: 76 }, // sweep above range
        { o: 76, h: 78, l: 56, c: 60 }, // distribution
        { o: 60, h: 62, l: 46, c: 49 }, // breakdown
        { o: 49, h: 51, l: 32, c: 35 }, // drop
      ];
  const xs = [38, 86, 136, 192, 250, 312, 372, 434];
  const min = 22, max = 96;
  const rangeTop = py(72, min, max);
  const rangeBot = py(50, min, max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      <GridLines levels={[32, 52, 70, 86]} minP={min} maxP={max} />

      <rect x={xs[2] - 18} y={rangeTop} width={xs[5] + 18 - (xs[2] - 18)} height={rangeBot - rangeTop}
        fill={bull ? "#22c55e" : "#ef4444"} opacity="0.07" />
      <DashedLine y={rangeTop} x1={xs[2] - 18} x2={xs[5] + 18} color={bull ? "#22c55e" : "#ef4444"} />
      <DashedLine y={rangeBot} x1={xs[2] - 18} x2={xs[5] + 18} color={bull ? "#22c55e" : "#ef4444"} />
      <SolidLabel x={(xs[2] + xs[5]) / 2} y={rangeTop - 8}
        text={bull ? "ACUMULACIÓN" : "DISTRIBUCIÓN"}
        bg={bull ? "#15803d" : "#b91c1c"} color="#fff" size={10} />

      {candles.map((c, i) => <Candle key={i} x={xs[i]} candle={c} minP={min} maxP={max} />)}

      <SolidLabel x={xs[4]} y={bull ? py(38, min, max) : py(84, min, max)}
        text={bull ? "SWEEP ↓" : "SWEEP ↑"} bg="#c2410c" color="#fff" size={8.5} />

      <ThickArrow
        x1={xs[7]} y1={bull ? py(70, min, max) : py(56, min, max)}
        x2={xs[7]} y2={bull ? py(94, min, max) : py(30, min, max)}
        color={bull ? "#22c55e" : "#ef4444"} id={`acc-arr-${mode}`}
      />
    </svg>
  );
}

function ChartDistribution({ mode }: { mode: "bullish" | "bearish" }) {
  return <ChartAccumulation mode={mode === "bullish" ? "bearish" : "bullish"} />;
}

function ChartPsychology({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const stages = bull
    ? [
        { label: "Esperanza", x: 68,  y: 148, color: "#86efac" },
        { label: "Optimismo", x: 145, y: 108, color: "#22c55e" },
        { label: "Euforia",   x: 238, y:  56, color: "#facc15" },
        { label: "FOMO",      x: 308, y:  47, color: "#f59e0b" },
        { label: "Negación",  x: 370, y:  92, color: "#f97316" },
        { label: "Pánico",    x: 432, y: 168, color: "#ef4444" },
      ]
    : [
        { label: "Euforia",    x: 68,  y: 66,  color: "#facc15" },
        { label: "Negación",   x: 138, y: 94,  color: "#f97316" },
        { label: "Miedo",      x: 210, y: 128, color: "#fb923c" },
        { label: "Pánico",     x: 290, y: 178, color: "#ef4444" },
        { label: "Capitulac.", x: 368, y: 208, color: "#dc2626" },
        { label: "Depresión",  x: 434, y: 220, color: "#991b1b" },
      ];

  const pricePath = bull
    ? "M 55,152 C 90,132 118,112 145,110 C 182,90 210,68 238,59 C 264,50 292,48 308,48 C 328,52 348,72 370,94 C 400,130 418,158 435,170"
    : "M 55,70 C 88,80 114,90 138,97 C 163,104 188,118 210,132 C 240,150 268,172 290,182 C 314,194 342,206 368,212 C 394,218 416,220 438,224";

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      {[60, 100, 140, 180, 220].map(y => (
        <line key={y} x1={28} y1={y} x2={492} y2={y} stroke={GRID} strokeWidth="1" />
      ))}

      <path d={pricePath} fill="none" stroke={bull ? "#22c55e" : "#ef4444"} strokeWidth="3" />

      {stages.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="6" fill={s.color} />
          <SolidLabel x={s.x} y={s.y - 12} text={s.label} bg={LABEL_BG} color={s.color} size={7.5} />
        </g>
      ))}

      <SolidLabel x={260} y={236}
        text={bull ? "Comprar en miedo, no en euforia" : "Vender en euforia, no en pánico"}
        bg="#4338ca" color="#e0e7ff" size={8.5} />
    </svg>
  );
}

function ChartJournal({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const winRates = bull ? [38, 42, 46, 50, 54, 59] : [62, 54, 50, 46, 43, 40];
  const pnl = bull ? [-9, 1, 6, 14, 20, 30] : [18, 9, 2, -4, -12, -20];

  const scX = (i: number) => 68 + i * 78;
  const scWR = (v: number) => 185 - ((v - 30) / 40) * 124;
  const scPnL = (v: number) => 185 - ((v + 22) / 56) * 124;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />
      {[60, 100, 140, 185].map(y => <line key={y} x1={48} y1={y} x2={492} y2={y} stroke={GRID} strokeWidth="1" />)}

      <line x1={48} y1={scPnL(0)} x2={492} y2={scPnL(0)} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4" />

      {pnl.map((v, i) => {
        const h = Math.abs(scPnL(0) - scPnL(v));
        const isPos = v >= 0;
        return (
          <rect key={i} x={scX(i) - 12} y={isPos ? scPnL(v) : scPnL(0)}
            width={24} height={h} fill={isPos ? BULL_BODY : BEAR_BODY} opacity="0.8" rx="2" />
        );
      })}

      <polyline points={winRates.map((v, i) => `${scX(i)},${scWR(v)}`).join(" ")}
        fill="none" stroke="#818cf8" strokeWidth="2.5" />
      {winRates.map((v, i) => <circle key={i} cx={scX(i)} cy={scWR(v)} r="5" fill="#818cf8" />)}

      {months.map((m, i) => (
        <text key={i} x={scX(i)} y={204} fill="#64748b" fontSize={8.5} textAnchor="middle">{m}</text>
      ))}

      <circle cx={68} cy={220} r={5} fill="#818cf8" />
      <SolidLabel x={86} y={223} text="Win rate" bg={LABEL_BG} color="#818cf8" size={8} anchor="start" />
      <rect x={152} y={215} width={14} height={10} fill={BULL_BODY} opacity="0.8" rx="1" />
      <SolidLabel x={172} y={223} text="PnL" bg={LABEL_BG} color="#22c55e" size={8} anchor="start" />
      <SolidLabel x={350} y={223} text={bull ? "Mejora con registro" : "Sin registro = sin mejora"} bg="#4338ca" color="#e0e7ff" size={8} anchor="start" />
    </svg>
  );
}

function ChartPlan({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const boxes = [
    { x: 195, y: 28,  w: 132, h: 26, label: "¿Setup válido?",    color: "#818cf8" },
    { x: 74,  y: 88,  w: 116, h: 26, label: "NO → Esperar",      color: "#ef4444" },
    { x: 330, y: 88,  w: 116, h: 26, label: "SÍ → Verificar",    color: "#22c55e" },
    { x: 195, y: 148, w: 132, h: 26, label: bull ? "Definir SL / TP" : "Calc. tamaño lote", color: "#facc15" },
    { x: 195, y: 206, w: 132, h: 26, label: bull ? "EJECUTAR" : "NO SIN PLAN", color: bull ? "#22c55e" : "#ef4444" },
  ];

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />

      <defs>
        <marker id="plan-arr-new" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#475569" />
        </marker>
      </defs>
      <line x1={261} y1={54} x2={132} y2={88} stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-arr-new)" />
      <line x1={261} y1={54} x2={388} y2={88} stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-arr-new)" />
      <line x1={388} y1={114} x2={295} y2={148} stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-arr-new)" />
      <line x1={261} y1={174} x2={261} y2={206} stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-arr-new)" />

      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.color} opacity="0.14" rx="5" />
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={b.color} strokeWidth="1.5" rx="5" opacity="0.7" />
          <text x={b.x + b.w / 2} y={b.y + 17} textAnchor="middle" fill={b.color} fontSize={9} fontWeight="800">{b.label}</text>
        </g>
      ))}
    </svg>
  );
}

function ChartBacktesting({ mode }: { mode: "bullish" | "bearish" }) {
  const bull = mode === "bullish";
  const results = [
    { n: 1, dir: "L", entry: "FVG + BOS",     rr: "1:2",   res: bull ? "WIN" : "LOSS" },
    { n: 2, dir: "L", entry: "OB + CHoCH",    rr: "1:2",   res: bull ? "WIN" : "LOSS" },
    { n: 3, dir: "S", entry: "FVG + Sweep",   rr: "1:1.5", res: bull ? "LOSS" : "WIN" },
    { n: 4, dir: "L", entry: "Sweep + OB",    rr: "1:3",   res: bull ? "WIN" : "WIN" },
    { n: 5, dir: "S", entry: "CHoCH + FVG",   rr: "1:2",   res: bull ? "LOSS" : "WIN" },
    { n: 6, dir: "L", entry: "BOS + Pullback", rr: "1:2",  res: bull ? "WIN" : "LOSS" },
  ];
  const wins = results.filter(r => r.res === "WIN").length;
  const wr = Math.round((wins / results.length) * 100);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6" />

      <rect x={24} y={18} width={472} height={24} fill="#1e293b" rx="4" />
      {["#", "Dir", "Setup", "R:R", "Resultado"].map((h, i) => {
        const cx = [52, 90, 212, 342, 446][i];
        return <text key={i} x={cx} y={34} textAnchor="middle" fill="#64748b" fontSize={8.5} fontWeight="700">{h}</text>;
      })}

      {results.map((r, i) => {
        const rowY = 48 + i * 28;
        const isWin = r.res === "WIN";
        return (
          <g key={i}>
            <rect x={24} y={rowY} width={472} height={26} fill={i % 2 === 0 ? "#111827" : BG} />
            <text x={52}  y={rowY + 16} textAnchor="middle" fill="#e2e8f0" fontSize={8.5}>{r.n}</text>
            <text x={90}  y={rowY + 16} textAnchor="middle" fill={r.dir === "L" ? "#22c55e" : "#ef4444"} fontSize={8.5} fontWeight="700">{r.dir}</text>
            <text x={212} y={rowY + 16} textAnchor="middle" fill="#cbd5e1" fontSize={8}>{r.entry}</text>
            <text x={342} y={rowY + 16} textAnchor="middle" fill="#818cf8" fontSize={8.5}>{r.rr}</text>
            <rect x={404} y={rowY + 6} width={84} height={14} fill={isWin ? "#15803d" : "#b91c1c"} opacity="0.25" rx="3" />
            <text x={446} y={rowY + 16} textAnchor="middle" fill={isWin ? "#22c55e" : "#ef4444"} fontSize={8.5} fontWeight="900">{r.res}</text>
          </g>
        );
      })}

      <rect x={24} y={218} width={472} height={24} fill="#1e293b" rx="4" />
      <text x={120} y={234} textAnchor="middle" fill="#22c55e" fontSize={9} fontWeight="900">Win rate: {wr}%</text>
      <text x={264} y={234} textAnchor="middle" fill="#818cf8" fontSize={9} fontWeight="900">Trades: {results.length}</text>
      <text x={418} y={234} textAnchor="middle" fill="#94a3b8" fontSize={8}>Wins: {wins} / Loss: {results.length - wins}</text>
    </svg>
  );
}

// ─────────────────────────────────────────────
// DISPATCHER
// ─────────────────────────────────────────────

const CHART_MAP: Record<ChartKind, React.FC<{ mode: "bullish" | "bearish" }>> = {
  liquidity:      ChartLiquidity,
  fvg:            ChartFVG,
  orderblock:     ChartOrderBlock,
  bos:            ChartBOS,
  choch:          ChartCHoCH,
  support:        ChartSupport,
  resistance:     ChartResistance,
  uptrend:        ChartUptrend,
  downtrend:      ChartDowntrend,
  range:          ChartRange,
  pullback:       ChartPullback,
  retest:         ChartRetest,
  stoploss:       ChartStopLoss,
  takeprofit:     ChartTakeProfit,
  riskreward:     ChartRiskReward,
  riskmanagement: ChartRiskManagement,
  sessions:       ChartSessions,
  volume:         ChartVolume,
  manipulation:   ChartManipulation,
  sweep:          ChartSweep,
  institutional:  ChartInstitutional,
  confirmation:   ChartConfirmation,
  impulse:        ChartImpulse,
  correction:     ChartCorrection,
  accumulation:   ChartAccumulation,
  distribution:   ChartDistribution,
  psychology:     ChartPsychology,
  journal:        ChartJournal,
  plan:           ChartPlan,
  backtesting:    ChartBacktesting,
};

function ConceptChart({ concept, mode }: { concept: Concept; mode: "bullish" | "bearish" }) {
  const isBull = mode === "bullish";
  const ChartComponent = CHART_MAP[concept.chartKind];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#050814] p-3 shadow-2xl">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-wide text-white flex items-center gap-2">
          {isBull ? "EJEMPLO ALCISTA" : "EJEMPLO BAJISTA"}
          <span className="text-lg">{isBull ? "↗" : "↘"}</span>
        </h3>
        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${
          isBull ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"
        }`}>
          {isBull ? "BUY SETUP" : "SELL SETUP"}
        </span>
      </div>
      <div className="overflow-hidden rounded-xl aspect-[2/1]">
        <ChartComponent mode={mode} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function ConceptosPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");

  const selected = concepts.find((c) => c.id === selectedId) ?? concepts[0];

  const filtered = concepts.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-[#030711] p-3 text-white md:p-4">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1800px] grid-cols-1 gap-4 xl:grid-cols-[330px_minmax(0,1fr)_450px]">

        {/* SIDEBAR */}
        <aside className="rounded-xl border border-slate-800 bg-[#050a14]/95 p-5 shadow-2xl xl:sticky xl:top-4 xl:h-[calc(100vh-32px)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-700 font-black">R</div>
            <h1 className="text-4xl font-black tracking-tight text-violet-500">aprende desde cero</h1>
          </div>
          <h2 className="mb-4 text-xl font-black uppercase tracking-wide text-slate-100">Conceptos de trading</h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar concepto..."
            className="mb-4 w-full rounded-lg border border-slate-700 bg-[#080d19] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-violet-500"
          />
          <div className="max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-2">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-[14px] transition ${
                  selected.id === c.id
                    ? "bg-gradient-to-r from-violet-700 to-violet-600 text-white shadow-[0_0_18px_rgba(124,58,237,0.45)]"
                    : "text-slate-200 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{c.id}. {c.title}</span>
                {selected.id === c.id && <span className="h-2 w-2 rounded-full bg-violet-200" />}
              </button>
            ))}
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 w-full rounded-lg border border-violet-500/50 bg-violet-950/30 px-4 py-3 font-semibold text-violet-300 transition hover:bg-violet-900/40"
          >
            ← Volver al Dashboard
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <section className="rounded-xl border border-slate-800 bg-[#07101c]/95 p-6 shadow-2xl xl:h-[calc(100vh-32px)] xl:overflow-y-auto">
          <div className="mb-7 border-b border-slate-700 pb-6">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-violet-300">{selected.tag}</p>
            <h2 className="text-4xl font-black text-violet-300 drop-shadow-[0_0_18px_rgba(168,85,247,0.65)]">
              {selected.id}. {selected.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-300">{selected.subtitle}</p>
          </div>

          <div className="space-y-6 text-[17px] leading-8 text-slate-100">
            {selected.explanation.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="my-8 border-t border-slate-800" />

          <div className="rounded-xl border border-slate-700 bg-[#030711]/40 p-5">
            <h3 className="mb-4 text-xl font-black text-violet-300">
              Claves para identificar {selected.title.toLowerCase()}:
            </h3>
            <ul className="space-y-3 text-[16px] leading-7 text-slate-100">
              {selected.keys.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  <span>{key}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-slate-700 bg-[#030711]/40 p-5">
            <h3 className="mb-4 text-xl font-black text-violet-300">Cómo usarlo a tu favor:</h3>
            <p className="text-[16px] leading-8 text-slate-100">{selected.usage}</p>
          </div>

          <div className="mt-6 rounded-xl border border-violet-800/80 bg-violet-950/20 p-5">
            <h3 className="mb-3 text-xl font-black text-violet-300">⭐ Resumen</h3>
            <p className="text-[16px] leading-8 text-slate-200">{selected.summary}</p>
          </div>
        </section>

        {/* CHARTS */}
        <section className="grid gap-4 xl:h-[calc(100vh-32px)] xl:grid-rows-2">
          <ConceptChart concept={selected} mode="bullish" />
          <ConceptChart concept={selected} mode="bearish" />
        </section>
      </div>
    </main>
  );
}
