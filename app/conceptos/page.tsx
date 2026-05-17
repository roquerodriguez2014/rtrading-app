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
    id: 1, title: "Liquidez", tag: "Smart Money",
    subtitle: "Dónde se acumulan órdenes y stops antes del movimiento real.",
    chartKind: "liquidity",
    explanation: ["La liquidez es el combustible que mueve el mercado. En términos simples, es la acumulación de órdenes pendientes, stops de pérdida y órdenes de entrada que los traders minoristas colocan en zonas técnicas predecibles como máximos anteriores, mínimos anteriores, líneas de tendencia y niveles psicológicos. Los grandes participantes del mercado —bancos, fondos de cobertura e instituciones— necesitan enormes volúmenes de órdenes contrapuestas para ejecutar sus posiciones sin mover demasiado el precio.", "El concepto central es que el precio no se mueve al azar. Antes de cualquier movimiento significativo, suele buscar primero las zonas donde hay mayor concentración de órdenes. Esto ocurre porque las instituciones necesitan esa liquidez para llenar sus posiciones. Cuando el precio barre una zona de liquidez —por ejemplo, rompe brevemente los mínimos donde todos pusieron sus stops— activa esas órdenes y genera el volumen necesario para el movimiento real.", "Identificar la liquidez significa aprender a leer el gráfico desde la perspectiva institucional. Las zonas de mayor liquidez se forman sobre máximos previos iguales (equal highs), debajo de mínimos previos iguales (equal lows), en niveles de soporte y resistencia muy visibles, y en los extremos de rangos laterales. Cuanto más obvio sea un nivel técnico para los traders minoristas, más liquidez hay acumulada ahí y más probable es que el precio lo visite antes de moverse en serio.", "La clave práctica no es entrar en la primera ruptura de un nivel, sino observar si el precio acepta el nuevo territorio o si solo realizó un barrido rápido para tomar los stops y luego girar. Un barrido de liquidez bien identificado, seguido de una vela de rechazo fuerte, suele ser una de las señales de entrada más confiables del análisis técnico institucional."],
    keys: ["Máximos o mínimos iguales acumulan stops de muchos traders.", "Las instituciones necesitan liquidez para ejecutar posiciones grandes.", "El barrido de liquidez precede al movimiento real en la dirección opuesta.", "Cuanto más obvio el nivel, más liquidez y más probable el barrido.", "Esperar confirmación de rechazo tras el barrido antes de entrar."],
    usage: "Marcá los equal highs y equal lows en tu gráfico. Cuando el precio los barra con una mecha larga y cierre contrario, buscá confirmación para entrar en la dirección opuesta al barrido.",
    summary: "La liquidez muestra dónde el mercado irá primero antes de moverse en serio. Identificar esas zonas te permite anticipar el movimiento real en lugar de ser atrapado por él."
  },
  {
    id: 2, title: "FVG / Fair Value Gap", tag: "Smart Money",
    subtitle: "Desequilibrio de precio que funciona como zona de retorno y reacción.",
    chartKind: "fvg",
    explanation: ["Un Fair Value Gap (FVG) o Gap de Valor Justo es una ineficiencia que aparece en el gráfico cuando el precio se desplaza con tanta fuerza que deja una zona sin negociar entre tres velas consecutivas. Técnicamente, en un FVG alcista, el mínimo de la tercera vela está por encima del máximo de la primera vela, dejando un espacio vacío en el medio. En un FVG bajista ocurre lo contrario: el máximo de la tercera vela está por debajo del mínimo de la primera.", "Este desequilibrio representa una zona donde compradores y vendedores no llegaron a negociar en condiciones equilibradas. El mercado tiene una tendencia natural a volver a esas zonas para 'llenar el gap', es decir, para que el precio vuelva a esa área y permita que los participantes que quedaron fuera del movimiento inicial puedan entrar a un precio razonable. Por eso se llama 'valor justo': el precio regresa a donde debería haber estado.", "El FVG es más confiable cuando aparece en un contexto estructural claro: después de un barrido de liquidez, después de un cambio de carácter (CHoCH) o como parte de un desplazamiento impulsivo post-ruptura de estructura (BOS). Un FVG aislado sin contexto tiene mucho menor probabilidad de reaccionar de manera predecible.", "En la práctica, se usa como zona de entrada: cuando el precio regresa al FVG desde el lado correcto, se busca una vela de confirmación para entrar en la dirección del impulso original. El stop se coloca por debajo del FVG (en compras) o por encima (en ventas), y el objetivo es el siguiente nivel de liquidez o estructura relevante."],
    keys: ["Zona vacía entre tres velas consecutivas tras un movimiento fuerte.", "Representa desequilibrio entre oferta y demanda.", "El precio tiende a regresar a esa zona antes de continuar.", "Más válido cuando sigue a una ruptura de estructura o barrido.", "Se usa como zona de entrada con stop ajustado al extremo del gap."],
    usage: "Marcá el gap entre la vela 1 y vela 3 del movimiento impulsivo. Esperá que el precio regrese a esa zona, observá la reacción y buscá confirmación de vela antes de entrar.",
    summary: "El FVG representa un desequilibrio que el mercado tiende a corregir. Cuando el precio retorna a esa zona con confirmación, ofrece una entrada de alta probabilidad en la dirección del impulso original."
  },
  {
    id: 3, title: "Order Block", tag: "Smart Money",
    subtitle: "Zona institucional donde grandes players ejecutaron órdenes masivas.",
    chartKind: "orderblock",
    explanation: ["Un Order Block (OB) es una zona en el gráfico que representa la última vela de dirección contraria antes de un movimiento impulsivo fuerte. Se interpreta como la zona donde las instituciones y grandes participantes del mercado ejecutaron sus órdenes masivas, dejando una 'huella' en el gráfico. En un order block alcista, es la última vela bajista antes de una subida fuerte. En uno bajista, es la última vela alcista antes de una caída significativa.", "La lógica detrás del order block es que las instituciones no pueden ejecutar todas sus órdenes de una sola vez sin mover el mercado demasiado. Por eso, cuando el precio regresa a esa zona, hay órdenes institucionales pendientes que se activan, generando una reacción. Es como si el mercado 'recordara' que en ese nivel hubo participación fuerte y vuelve a reaccionar cuando el precio lo revisita.", "Para que un order block sea válido, debe cumplir ciertas condiciones: debe generar un desplazamiento fuerte e impulsivo inmediatamente después, debe haber dejado un FVG o ruptura de estructura, y cuando el precio regrese a esa zona, debe haber reacción clara. No toda vela contraria antes de un movimiento es un OB válido; el impulso posterior debe ser contundente.", "La entrada en un OB se realiza cuando el precio regresa a esa zona y muestra señales de rechazo: velas de reversión, disminución del momentum bajista (en OB alcistas) o patrones de acción del precio que confirmen la participación. El stop loss se coloca por debajo del orden block completo, dando espacio para que el precio explore la zona sin invalidar la idea."],
    keys: ["Última vela contraria antes de un desplazamiento fuerte e impulsivo.", "Zona donde las instituciones ejecutaron posiciones masivas.", "Debe generar BOS o FVG inmediatamente después para ser válido.", "El precio tiende a regresar a esa zona y reaccionar.", "Stop debajo del OB completo para dar espacio a la zona institucional."],
    usage: "Identificá la última vela bajista antes de una subida impulsiva (OB alcista). Cuando el precio regrese a esa zona, esperá vela de rechazo o cierre fuerte para entrar con stop bajo el OB.",
    summary: "El order block marca una zona institucional de alta probabilidad de reacción. Cuando el precio la revisita, las órdenes pendientes generan el rechazo que buscamos para entrar en la dirección del impulso original."
  },
  {
    id: 4, title: "Break of Structure (BOS)", tag: "Estructura",
    subtitle: "Ruptura confirmada de un máximo o mínimo estructural relevante.",
    chartKind: "bos",
    explanation: ["El Break of Structure (BOS) o Ruptura de Estructura es uno de los conceptos más fundamentales del análisis institucional. Ocurre cuando el precio rompe de manera decisiva un máximo o mínimo estructural relevante, confirmando la intención y dirección del mercado. En un contexto alcista, el BOS se produce cuando el precio supera un máximo previo importante con cierre de vela por encima. En un contexto bajista, cuando rompe un mínimo previo con cierre por debajo.", "La importancia del BOS radica en que confirma que la estructura del mercado ha cambiado o continúa en una dirección. En una tendencia alcista saludable, los BOS al alza se producen de forma consecutiva, marcando cada nuevo máximo como evidencia de control comprador. En una tendencia bajista, los BOS a la baja confirman el dominio vendedor. El BOS es la prueba objetiva de que la tendencia está intacta o que se ha establecido una nueva dirección.", "Es fundamental distinguir el BOS de una simple mecha que toca un nivel: el BOS requiere cierre de vela más allá del nivel estructural. Una mecha sin cierre puede ser manipulación o un sweep de liquidez, no necesariamente un BOS válido. El cierre es lo que confirma la aceptación del precio en el nuevo territorio.", "Desde el punto de vista operativo, el BOS no se opera directamente —perseguir la ruptura suele resultar en entradas tardías con mal riesgo-beneficio. Lo profesional es usar el BOS para confirmar la dirección y luego esperar un retroceso a una zona de valor (FVG, OB, soporte roto) para entrar con mejor precio y stop más ajustado."],
    keys: ["Ruptura de máximo previo (alcista) o mínimo previo (bajista) con cierre.", "Confirma la dirección e intención del mercado.", "Requiere cierre de vela más allá del nivel, no solo mecha.", "No se opera directamente; se usa para definir sesgo direccional.", "Luego esperar retroceso a zona de valor para entrar con mejor precio."],
    usage: "Usá el BOS para confirmar tu sesgo de dirección. Una vez que el BOS ocurre, esperá el retroceso a FVG u OB más cercano para buscar entrada en la misma dirección del BOS.",
    summary: "El BOS confirma que la estructura fue rota y establece la dirección dominante del mercado. Es la base para definir el sesgo de trading y buscar entradas en retrocesos dentro de esa dirección."
  },
  {
    id: 5, title: "Change of Character (CHoCH)", tag: "Estructura",
    subtitle: "Primera señal de posible reversión o cambio de control del mercado.",
    chartKind: "choch",
    explanation: ["El Change of Character (CHoCH) o Cambio de Carácter es la primera señal observable de que el control del mercado puede estar transfiriéndose de un lado al otro. A diferencia del BOS que confirma continuación, el CHoCH indica una posible reversión. Aparece cuando, en medio de una tendencia bajista, el precio rompe por primera vez hacia arriba un máximo de la microestructura (el último Lower High), o en una tendencia alcista, cuando rompe hacia abajo un mínimo relevante.", "El CHoCH es especialmente poderoso cuando aparece después de un barrido de liquidez. La secuencia clásica es: tendencia en una dirección → barrido de liquidez (toma de stops) → CHoCH → inicio del movimiento contrario. Esta secuencia es la base de la mayoría de los setups institucionales de alta calidad porque combina liquidez tomada con cambio de estructura.", "Es importante entender que el CHoCH es una señal temprana, no una garantía. Puede fallar, especialmente en rangos laterales donde los cambios de carácter son frecuentes y poco significativos. Por eso requiere confirmación: lo ideal es ver el CHoCH, esperar un retroceso a FVG u OB, y entrar solo cuando el precio muestre reacción en esa zona.", "La diferencia entre CHoCH y BOS en la práctica operativa es que el CHoCH señala un posible inicio de nueva tendencia (reversión), mientras que el BOS confirma continuación de la tendencia existente. El trader debe reconocer cuál de los dos está ocurriendo para no operar contra la tendencia cuando cree estar operando una reversión."],
    keys: ["Primera ruptura contraria a la tendencia dominante en microestructura.", "Señala posible transferencia de control entre compradores y vendedores.", "Más válido cuando sigue a un barrido de liquidez.", "Es señal temprana; requiere confirmación adicional.", "Diferente al BOS: indica reversión, no continuación."],
    usage: "Buscá CHoCH después de un barrido de liquidez claro. Una vez que ocurre, esperá retroceso a la zona de valor más cercana (FVG u OB) para entrar en la nueva dirección con confirmación.",
    summary: "El CHoCH es el primer aviso de que el mercado puede estar cambiando de dirección. Combinado con un barrido previo de liquidez, es el inicio de la secuencia institucional de alta probabilidad."
  },
  {
    id: 6, title: "Soporte", tag: "Análisis técnico",
    subtitle: "Zona de demanda donde el precio históricamente encuentra compradores.",
    chartKind: "support",
    explanation: ["El soporte es uno de los conceptos más fundamentales del análisis técnico y también uno de los más malentendidos. Es una zona en el gráfico donde el precio ha encontrado demanda suficiente en el pasado para detener una caída y generar un rebote. No es una línea exacta sino un área —una zona de precios donde la presión compradora supera a la vendedora de manera consistente. Esta zona se forma porque muchos traders la recuerdan como punto de compra previo y colocan órdenes allí.", "La psicología detrás del soporte es fundamental para entenderlo. Cuando el precio ha rebotado en una zona varias veces, cada rebote crea un 'recuerdo colectivo' en el mercado. Los traders que compraron ahí en el pasado y obtuvieron ganancias quieren repetir la experiencia. Los que vendieron en corto en esa zona y perdieron recuerdan no hacerlo de nuevo. Esto crea una zona de demanda autoreforzada.", "Un soporte se vuelve más fuerte cuanto más veces el precio lo ha respetado, pero paradójicamente, cada vez que lo toca lo debilita un poco porque consume las órdenes de compra disponibles allí. Un soporte que ha sido tocado muchas veces tiene más probabilidad de romperse finalmente porque las órdenes acumuladas se van agotando.", "Desde el enfoque institucional, los soportes más relevantes no son los más obvios sino los que coinciden con otras confluencias: zonas de FVG, order blocks, niveles de liquidez o retrocesos de tendencia. Un soporte aislado tiene menor probabilidad de mantener que uno con múltiples confluencias. La entrada no se hace simplemente porque el precio 'tocó soporte', sino cuando hay confirmación de reacción."],
    keys: ["Zona de demanda donde el precio ha rebotado en el pasado.", "Es un área, no una línea exacta; dar margen al precio.", "Se fortalece con múltiples confluencias (FVG, OB, liquidez).", "Cada toque lo debilita; muchos toques aumentan la probabilidad de ruptura.", "Esperar confirmación de reacción antes de comprar, no entrar a ciegas."],
    usage: "Marcá la zona de soporte como un área. Esperá que el precio llegue ahí y buscá una vela de reversión alcista, mecha larga de rechazo o ruptura de microestructura antes de entrar.",
    summary: "El soporte es una zona donde la demanda histórica supera la oferta. Su poder real está en la confluencia con otros conceptos institucionales y en la confirmación de reacción antes de operar."
  },
  {
    id: 7, title: "Resistencia", tag: "Análisis técnico",
    subtitle: "Zona de oferta donde el precio históricamente encuentra vendedores.",
    chartKind: "resistance",
    explanation: ["La resistencia es el opuesto del soporte: es una zona en el gráfico donde el precio ha encontrado suficiente presión vendedora en el pasado como para detener una subida y generar un rechazo. Al igual que el soporte, no es una línea exacta sino un área de precios donde la oferta supera consistentemente a la demanda. Los traders que compraron por encima de esa zona y quedaron atrapados en pérdidas esperan el regreso del precio para salir sin pérdidas ('manos débiles'), generando presión vendedora.", "La psicología detrás de la resistencia incluye varios factores: los traders que vendieron exitosamente en esa zona antes quieren repetirlo, los que compraron ahí y están en pérdida quieren salir cuando el precio regresa, y los que se perdieron la venta anterior buscan una segunda oportunidad. Todo esto crea una zona de oferta autoreforzada que puede contener el precio múltiples veces.", "Una de las propiedades más importantes de la resistencia es su capacidad de convertirse en soporte una vez rota. Cuando el precio rompe una resistencia de manera convincente —con cierre de vela por encima y desplazamiento posterior—, esa misma zona donde antes había vendedores ahora se convierte en zona de compradores.", "El retesteo de una resistencia rota como soporte es uno de los setups más clásicos y fiables del análisis técnico. La entrada se realiza cuando el precio regresa a la antigua resistencia (ahora soporte), muestra rechazo y confirma que el nivel fue aceptado como soporte. El stop se coloca por debajo del nivel para proteger la operación."],
    keys: ["Zona de oferta donde el precio ha encontrado vendedores repetidamente.", "Psicología de 'manos atrapadas': vendedores esperan el regreso del precio.", "La resistencia rota con fuerza se convierte en soporte (rol swap).", "El retesteo de resistencia rota como soporte es un setup clásico.", "Confirmar ruptura con cierre de vela, no solo mecha sobre el nivel."],
    usage: "Cuando el precio rompe una resistencia con cierre fuerte, marcá esa zona como futuro soporte. Esperá el retesteo y buscá vela de confirmación alcista para entrar con stop bajo el nivel.",
    summary: "La resistencia marca donde la oferta histórica frena el precio. Su ruptura confirmada y el posterior retesteo como soporte generan uno de los setups de mayor probabilidad en análisis técnico."
  },
  {
    id: 8, title: "Tendencia alcista", tag: "Estructura",
    subtitle: "Secuencia de máximos y mínimos crecientes que define el control comprador.",
    chartKind: "uptrend",
    explanation: ["Una tendencia alcista es la estructura más básica y fundamental que debe reconocer cualquier trader. Se define por la presencia de máximos crecientes (Higher Highs - HH) y mínimos crecientes (Higher Lows - HL) de manera consecutiva. Esta secuencia indica que el mercado está siendo controlado por los compradores: cada impulso alcista supera el máximo anterior (HH) y cada retroceso se detiene más arriba que el mínimo anterior (HL), sin romper la estructura.", "La tendencia alcista no solo importa en el timeframe que estás operando sino en múltiples timeframes. Un trader profesional alinea su dirección con la tendencia del timeframe mayor. Si en el gráfico diario hay tendencia alcista, buscar compras en H4 o H1 tiene mucho mayor probabilidad que buscar ventas.", "Dentro de una tendencia alcista, los retrocesos (pullbacks) a los Higher Lows son las oportunidades de entrada de mayor calidad. No se compra en el máximo después de un impulso, sino se espera que el precio retroceda a una zona de valor —una zona de demanda, FVG o OB— dentro del Higher Low y ahí buscar la entrada.", "La tendencia alcista se invalida cuando el precio rompe el último Higher Low de manera decisiva. Esa ruptura indica que el control puede estar cambiando y que operar compras ya no tiene la misma probabilidad."],
    keys: ["Definida por Higher Highs (HH) y Higher Lows (HL) consecutivos.", "Los retrocesos a HL son las mejores oportunidades de compra.", "Alinear con tendencia del timeframe mayor para mayor probabilidad.", "Se invalida con la ruptura decisiva del último Higher Low.", "No comprar en el impulso; esperar el retroceso a zona de valor."],
    usage: "En tendencia alcista confirmada, esperá que el precio retroceda a una zona de demanda (OB, FVG, soporte) que coincida con el área del último HL. Buscá confirmación y comprá con stop bajo esa zona.",
    summary: "La tendencia alcista es la estructura que define el control comprador. Operar dentro de ella, comprando los retrocesos a Higher Lows, es la estrategia de mayor probabilidad en mercados direccionales."
  },
  {
    id: 9, title: "Tendencia bajista", tag: "Estructura",
    subtitle: "Secuencia de máximos y mínimos decrecientes que define el control vendedor.",
    chartKind: "downtrend",
    explanation: ["La tendencia bajista es la contraparte de la tendencia alcista y se define por la presencia de máximos decrecientes (Lower Highs - LH) y mínimos decrecientes (Lower Lows - LL) de manera consecutiva. Esta estructura indica que los vendedores tienen el control del mercado.", "Operar en tendencia bajista requiere disciplina mental. En una tendencia bajista clara, las ventas en los rebotes tienen mucho mayor probabilidad que intentar atrapar el suelo comprando.", "Los rebotes dentro de la tendencia bajista (los Lower Highs) son las zonas de venta de mayor calidad. Cuando el precio rebota y llega a una zona de oferta institucional que coincide con el área del LH esperado, ahí es donde se busca la entrada vendedora.", "La tendencia bajista se invalida cuando el precio rompe el último Lower High de manera decisiva con cierre de vela. Esa ruptura indica que los compradores están recuperando terreno."],
    keys: ["Definida por Lower Highs (LH) y Lower Lows (LL) consecutivos.", "Los rebotes a LH son las mejores oportunidades de venta.", "Requiere disciplina para no comprar contra la tendencia dominante.", "Se invalida con ruptura decisiva del último Lower High.", "No vender en el impulso; esperar el rebote a zona de oferta."],
    usage: "En tendencia bajista confirmada, esperá que el precio rebote a una zona de oferta (OB, FVG, resistencia) que coincida con el área del LH esperado. Buscá confirmación bajista y vendé con stop sobre esa zona.",
    summary: "La tendencia bajista es la estructura que define el control vendedor. Operar dentro de ella, vendiendo los rebotes a Lower Highs, es la estrategia de mayor probabilidad en mercados bajistas."
  },
  {
    id: 10, title: "Rango lateral", tag: "Contexto",
    subtitle: "Precio consolidado entre soporte y resistencia sin dirección definida.",
    chartKind: "range",
    explanation: ["Un rango lateral ocurre cuando el precio se mueve de manera horizontal entre una zona de soporte (piso) y una zona de resistencia (techo) sin establecer una dirección clara. Los rangos pueden durar desde horas hasta meses y representan un período de equilibrio entre compradores y vendedores. El mercado pasa entre el 60% y el 70% del tiempo en algún tipo de consolidación.", "La estructura interna de un rango tiene tres zonas bien diferenciadas: el techo (zona de resistencia/oferta), el piso (zona de soporte/demanda) y el centro (zona de equilibrio). El centro del rango es la zona de peor relación riesgo-beneficio porque el precio puede ir tanto hacia el techo como hacia el piso desde ahí.", "Las mejores oportunidades dentro de un rango son en sus extremos: compras en el piso con confirmación de rebote y ventas en el techo con confirmación de rechazo. Dentro de los rangos, los barridos de liquidez son muy comunes: el precio rompe falsamente el techo o piso para tomar stops.", "El rango termina con una ruptura genuina. Los rangos previos a movimientos grandes suelen ser fases de acumulación (si rompen hacia arriba) o distribución (si rompen hacia abajo)."],
    keys: ["Precio oscila entre soporte (piso) y resistencia (techo) sin dirección.", "El centro del rango tiene la peor relación riesgo-beneficio.", "Los extremos del rango son las mejores zonas de operación.", "Los barridos falsos de los extremos son frecuentes; esperar confirmación.", "La ruptura del rango con retesteo confirma el nuevo movimiento direccional."],
    usage: "En un rango, operá solo los extremos con confirmación. En el piso, buscá rebote alcista. En el techo, buscá rechazo bajista. Evitá el centro. Si hay ruptura, esperá retesteo antes de operar la continuación.",
    summary: "El rango lateral requiere paciencia y operar solo los extremos con confirmación. Los barridos falsos son parte del juego, y la ruptura del rango con retesteo define el próximo movimiento direccional."
  },
  {
    id: 11, title: "Pullback", tag: "Entrada",
    subtitle: "Retroceso temporal dentro de una tendencia que ofrece entrada con mejor precio.",
    chartKind: "pullback",
    explanation: ["El pullback es un retroceso temporal en contra de la tendencia principal, que le da al precio la oportunidad de 'respirar' y a los traders la posibilidad de entrar en la tendencia con un precio más favorable que perseguir el impulso. En una tendencia alcista, el pullback es una caída temporal antes de que el precio retome la subida.", "La diferencia entre un pullback (retroceso dentro de tendencia) y una reversión (cambio de tendencia) es crítica. Un pullback sano respeta la estructura de la tendencia: en alcista, el retroceso no rompe el último Higher Low; en bajista, el rebote no supera el último Lower High.", "Los mejores pullbacks ocurren cuando el precio regresa a una confluencia de zonas de valor: un FVG alcista, un order block alcista, un soporte previo o un nivel de retroceso significativo.", "Desde el punto de vista de ejecución, el pullback no se opera simplemente porque 'llegó a la zona'. Se espera confirmación: una vela de reversión alcista, un patrón de acción del precio que muestre que los vendedores están perdiendo fuerza."],
    keys: ["Retroceso temporal contra la tendencia principal, no una reversión.", "Debe respetar la estructura: no romper el HL (alcista) o LH (bajista).", "Mayor probabilidad cuando llega a confluencia de zonas de valor.", "Esperar confirmación de reacción, no entrar solo porque llegó a la zona.", "Permite entrar con mejor precio y stop más ajustado que perseguir el impulso."],
    usage: "Identificá la tendencia dominante y marcá las zonas de valor (FVG, OB, soporte). Cuando el precio retroceda a esa zona, esperá una vela de confirmación (engulfing, pin bar, cierre fuerte) para entrar.",
    summary: "El pullback es la oportunidad de entrar en una tendencia con precio favorable y riesgo reducido. Su calidad depende de la confluencia de la zona donde se detiene y la confirmación de reacción."
  },
  {
    id: 12, title: "Retesteo", tag: "Entrada",
    subtitle: "El precio regresa a probar un nivel roto para confirmar el cambio de rol.",
    chartKind: "retest",
    explanation: ["El retesteo ocurre cuando el precio, después de romper un nivel significativo, regresa a ese mismo nivel para 'probarlo' desde el otro lado. Es uno de los setups más clásicos y fiables del análisis técnico porque combina la confirmación de una ruptura con una entrada de bajo riesgo.", "La lógica psicológica del retesteo es poderosa. Cuando el precio rompe una resistencia, hay traders que se perdieron la ruptura y esperan que el precio regrese para comprar. Hay traders que vendieron corto y necesitan cubrir sus pérdidas cuando el precio regrese.", "No todos los retesteos son iguales en calidad. Los mejores son aquellos donde el nivel roto coincide con otras confluencias: un FVG dejado por el impulso de ruptura, un order block, una zona de liquidez o un nivel de estructura mayor.", "La entrada en el retesteo se hace cuando el precio toca el nivel y muestra una señal de confirmación. El stop se coloca por debajo del nivel (en retesteos alcistas) o por encima (en bajistas), con espacio suficiente."],
    keys: ["El precio regresa a probar el nivel roto desde el otro lado.", "Resistencia rota → soporte en retesteo. Soporte roto → resistencia en retesteo.", "Psicología: compradores y vendedores atrapados reaccionan en el nivel.", "Más fiable cuando coincide con FVG, OB u otras confluencias.", "Entrada con confirmación; stop bajo el nivel con espacio para volatilidad."],
    usage: "Esperá que el precio rompa un nivel clave con fuerza (BOS). Cuando regrese a probar ese nivel, buscá confirmación de reacción (vela, volumen, microestructura) para entrar con stop ajustado.",
    summary: "El retesteo confirma que una ruptura fue genuina y ofrece la entrada más segura en la nueva dirección. Es el setup donde la relación riesgo-beneficio suele ser más favorable."
  },
  {
    id: 13, title: "Stop Loss", tag: "Riesgo",
    subtitle: "El nivel donde la idea queda invalidada y la pérdida se limita.",
    chartKind: "stoploss",
    explanation: ["El stop loss es la herramienta más importante de gestión de riesgo. Es una orden predefinida para cerrar una posición cuando el precio alcanza un nivel determinado, limitando la pérdida. Más que una herramienta técnica, el stop loss es una declaración de intención: 'Si el precio llega aquí, mi idea estaba equivocada y prefiero perder poco a perder mucho'.", "La ubicación del stop loss debe ser técnica, no arbitraria ni basada en la cantidad de dinero que no querés perder. Un stop lógico se coloca en un nivel donde, si el precio lo toca, la hipótesis de trading queda claramente invalidada.", "Uno de los errores más comunes es mover el stop loss una vez que la operación está abierta para evitar ser salido. Esto aumenta el riesgo y convierte una pérdida pequeña en una grande. El stop se define antes de entrar y se respeta.", "El tamaño de la posición se calcula en función del stop loss. Si el stop está lejos, el lote debe ser menor. Si está cerca, el lote puede ser mayor. Esta relación es la mecánica fundamental de la gestión de riesgo."],
    keys: ["Orden automática que limita la pérdida si el precio alcanza el nivel definido.", "Debe colocarse en un nivel donde la hipótesis de trading queda invalidada.", "Se define ANTES de entrar, basado en análisis técnico, no en dinero.", "Nunca mover el stop en contra (ampliar la pérdida); solo a favor.", "El tamaño de posición se calcula según la distancia al stop."],
    usage: "Antes de entrar, identificá el nivel donde tu idea queda invalidada. Colocá el stop ahí. Calculá el lote para que esa pérdida represente tu riesgo máximo por operación (ej: 1%).",
    summary: "El stop loss es la herramienta que mantiene viva la cuenta. Su ubicación técnica y el respeto a su nivel son la diferencia entre trading profesional y juego de azar con el capital."
  },
  {
    id: 14, title: "Take Profit", tag: "Riesgo",
    subtitle: "Zona de salida planificada donde se materializan las ganancias.",
    chartKind: "takeprofit",
    explanation: ["El take profit es la orden de cierre de posición en un nivel predefinido de ganancia. Al igual que el stop loss, debe ser planificado antes de abrir la operación. La falta de un take profit claro lleva a uno de los dos errores más comunes: cerrar demasiado pronto por miedo, o dejar correr la ganancia hasta que se convierte en pérdida.", "La ubicación del take profit debe ser técnica: se coloca en el siguiente nivel de liquidez, resistencia (en compras) o soporte (en ventas) relevante. El objetivo debe estar donde el gráfico muestre que el precio encontrará obstáculos.", "Una estrategia eficaz es el take profit parcial: cerrar el 50-70% de la posición cuando el precio alcanza el primer objetivo (TP1), y dejar correr el resto hacia un segundo objetivo (TP2). Esto asegura ganancias concretas y permite capturar movimientos mayores.", "El take profit también se puede gestionar dinámicamente usando trailing stops: mover el stop a favor conforme el precio avanza, protegiendo ganancias sin cerrar la posición prematuramente."],
    keys: ["Orden de cierre en nivel predefinido de ganancia; planificada antes de entrar.", "Se ubica en el siguiente nivel técnico relevante (liquidez, resistencia, FVG).", "El TP parcial (TP1 y TP2) combina seguridad y captura de movimientos mayores.", "Mover stop a break even cuando TP1 es alcanzado para proteger ganancia.", "No inventar objetivos arbitrarios; deben tener justificación técnica."],
    usage: "Antes de entrar, identificá el siguiente nivel técnico relevante como TP1. Calculá si la relación riesgo-beneficio es al menos 1:1.5. Definí un TP2 más ambicioso si la estructura lo justifica.",
    summary: "El take profit planificado convierte el análisis en ganancia real y evita los errores emocionales. Su ubicación técnica define la calidad del setup."
  },
  {
    id: 15, title: "Relación Riesgo Beneficio", tag: "Riesgo",
    subtitle: "La proporción entre lo que arriesgás y lo que potencialmente ganás.",
    chartKind: "riskreward",
    explanation: ["La relación riesgo-beneficio (R:R) compara la pérdida potencial de una operación contra la ganancia potencial. Una relación R:R de 1:2 significa que por cada unidad que arriesgás, buscás ganar dos. Esta proporción determina si una estrategia puede ser rentable a largo plazo, independientemente de la tasa de aciertos.", "La matemática del R:R es poderosa y contraintuitiva. Con una relación de 1:2, solo necesitás acertar el 34% de las operaciones para no perder dinero. Con una relación de 1:3, con solo el 25% de aciertos no perdés.", "El R:R no se elige arbitrariamente. Debe surgir naturalmente del análisis técnico: el stop está en el nivel de invalidación, el take profit está en el siguiente nivel técnico relevante, y la diferencia entre ambos define el R:R real.", "Un error común es manipular el stop o el objetivo para que el número de R:R 'se vea mejor'. La honestidad en la definición de stop y objetivo es fundamental."],
    keys: ["Compara pérdida potencial vs ganancia potencial de la operación.", "Con R:R 1:2 solo necesitás acertar el 34% para ser rentable.", "Surge del análisis técnico; no se elige arbitrariamente.", "Mínimo recomendado: 1:1.5 para que el riesgo valga la pena.", "No manipular stop u objetivo para forzar un buen R:R en papel."],
    usage: "Una vez definidos el stop y el TP, calculá el R:R. Si es menor a 1:1.5, considerá si vale la pena tomar el trade o esperá un setup de mejor calidad.",
    summary: "El R:R es el motor de la rentabilidad a largo plazo. Con una buena relación riesgo-beneficio, podés ser rentable acertando menos de la mitad de tus operaciones."
  },
  {
    id: 16, title: "Gestión de riesgo", tag: "Riesgo",
    subtitle: "El sistema de reglas que protege el capital y garantiza la supervivencia.",
    chartKind: "riskmanagement",
    explanation: ["La gestión de riesgo es el conjunto de reglas que determina cuánto capital se arriesga en cada operación, cómo se maneja una racha de pérdidas y cómo se preserva el capital para poder seguir operando. Es el aspecto más importante del trading a largo plazo.", "El principio fundamental es el riesgo fijo por operación: no arriesgar más de un porcentaje del capital total en ninguna operación individual. El estándar recomendado para traders en desarrollo es entre el 0.5% y el 2% por operación.", "La gestión de riesgo también incluye reglas de límites diarios y semanales. Un límite de pérdida diaria del 3-5% evita los 'días de catástrofe' donde las emociones llevan a sobre-operar en pérdida.", "El sizing de posición se calcula dividiendo el riesgo en dinero por la distancia en puntos al stop loss. Esta fórmula asegura que independientemente de dónde esté el stop, la pérdida siempre sea la misma cantidad."],
    keys: ["Arriesgar entre 0.5% y 2% del capital por operación como máximo.", "Calcular el tamaño de lote según la distancia al stop, no por intuición.", "Establecer límite de pérdida diaria (3-5%) y parar cuando se alcanza.", "Nunca operar por revancha después de una pérdida.", "La consistencia en las reglas de riesgo es más valiosa que acertar entradas."],
    usage: "Definí tu riesgo por operación (ej: 1%). Para cada trade: lote = (capital × 1%) ÷ (distancia en puntos al stop × valor del punto). Respetá el límite diario de pérdida.",
    summary: "La gestión de riesgo es lo que separa al trader que sobrevive del que quema su cuenta. Las reglas de riesgo fijo y límites diarios son el sistema inmune de la cuenta de trading."
  },
  {
    id: 17, title: "Sesiones de mercado", tag: "Contexto",
    subtitle: "Los horarios donde cambia radicalmente la actividad, liquidez y volatilidad.",
    chartKind: "sessions",
    explanation: ["El mercado opera 24 horas al día, pero no todos los horarios tienen la misma actividad. Las tres sesiones principales son la sesión de Asia (Tokio), la sesión de Londres (Europa) y la sesión de Nueva York (América). Cada una tiene características distintas.", "La sesión asiática (00:00 a 09:00 GMT) se caracteriza por menor volatilidad y menor volumen. El precio tiende a moverse en un rango lateral, consolidando el movimiento de la sesión americana anterior.", "La sesión de Londres (07:00 a 16:00 GMT) es la de mayor volumen y generalmente establece el sesgo del día. Frecuentemente comienza con un barrido de la liquidez asiática y luego establece la dirección principal.", "La sesión de Nueva York (13:00 a 22:00 GMT) confirma o revierte el movimiento de Londres. El overlap 13-16 GMT es el período de mayor volatilidad del día."],
    keys: ["Asia: baja volatilidad, formación de rango y liquidez para las próximas sesiones.", "Londres: mayor volumen global, barre la liquidez asiática y establece dirección.", "Nueva York: confirma o revierte a Londres; overlap 13-16 GMT es el más volátil.", "El rango asiático crea las zonas de liquidez que buscan las sesiones siguientes.", "Alinear operaciones con la sesión de mayor relevancia para el activo."],
    usage: "Marcá los máximos y mínimos del rango asiático antes de que abra Londres. Observá si Londres los barre y en qué dirección. Usá eso como sesgo para buscar setups durante NY.",
    summary: "Las sesiones crean el ciclo diario del mercado: Asia consolida, Londres activa y NY confirma. Entender este ritmo te permite anticipar barridos y alinearte con el flujo institucional."
  },
  {
    id: 18, title: "Volumen", tag: "Confirmación",
    subtitle: "La cantidad de actividad detrás de cada movimiento del precio.",
    chartKind: "volume",
    explanation: ["El volumen representa la cantidad de contratos negociados en un período. Mientras el precio nos dice qué está pasando, el volumen nos dice cuánta convicción hay detrás de ese movimiento. Un precio que sube con volumen creciente tiene mucho más respaldo.", "La relación entre precio y volumen es una de las herramientas de confirmación más poderosas. En un impulso alcista genuino, el volumen debe aumentar durante el movimiento al alza y disminuir durante los retrocesos.", "La divergencia entre precio y volumen es especialmente útil. Cuando el precio hace nuevos máximos pero el volumen es menor, hay una divergencia bajista: el movimiento no tiene el mismo respaldo.", "En el análisis institucional, el volumen alto en una zona puede indicar participación institucional: absorción en un soporte o distribución en una resistencia."],
    keys: ["Impulsos con volumen alto son más confiables que con volumen bajo.", "Retrocesos con volumen bajo confirman que son temporales.", "Divergencia precio-volumen puede señalar agotamiento del movimiento.", "Volumen alto en soportes puede indicar absorción institucional.", "Comparar volumen del impulso vs retroceso para evaluar la salud de la tendencia."],
    usage: "Verificá que los impulsos en tu dirección de trading tengan mayor volumen que los retrocesos. Desconfiá de rupturas de niveles clave con volumen muy bajo: tienen mayor probabilidad de ser falsas.",
    summary: "El volumen es el detector de convicción detrás del precio. Un movimiento respaldado por volumen creciente es más confiable que uno que avanza en silencio."
  },
  {
    id: 19, title: "Manipulación", tag: "Smart Money",
    subtitle: "Movimiento diseñado para atrapar traders antes del giro real.",
    chartKind: "manipulation",
    explanation: ["La manipulación, en el contexto del análisis técnico institucional, se refiere a los movimientos diseñados para atrapar a los traders minoristas en el lado equivocado antes de que ocurra el movimiento real. Es la consecuencia natural de cómo los grandes participantes necesitan liquidez para ejecutar sus posiciones.", "El patrón más común es el 'fake breakout': el precio rompe un nivel técnico obvio, activa los stops y entradas de traders, y luego revierte violentamente en la dirección contraria.", "La manipulación se identifica observando ciertos patrones: una vela que rompe un nivel con mecha larga pero cierra de vuelta dentro del rango anterior, o un movimiento rápido que toca un nivel y revierte sin consolidación.", "La defensa contra la manipulación es la paciencia y la confirmación. No operar en el primer toque de un nivel obvio ni en la primera ruptura."],
    keys: ["El precio va a zonas obvias de stops para tomar esa liquidez.", "El fake breakout: rompe el nivel, atrapa traders y revierte con fuerza.", "Se identifica por mechas largas que rechazan el nuevo nivel.", "Ocurre más frecuentemente en niveles técnicos muy obvios y visibles.", "Defensa: esperar aceptación del nuevo nivel antes de operar la ruptura."],
    usage: "Cuando el precio rompe un nivel muy obvio y esperado, no entres inmediatamente. Esperá que demuestre aceptación. Si revierte rápido, puede ser manipulación.",
    summary: "La manipulación es la herramienta que usan los grandes participantes para obtener liquidez barata. Reconocerla te protege de ser la víctima y te permite usar el barrido como oportunidad."
  },
  {
    id: 20, title: "Barrido de liquidez", tag: "Smart Money",
    subtitle: "Ruptura breve de un nivel para tomar stops y generar el movimiento real.",
    chartKind: "sweep",
    explanation: ["El barrido de liquidez ocurre cuando el precio rompe brevemente un nivel técnico significativo, activa los stops allí acumulados y luego revierte rápidamente en la dirección contraria. La clave es la brevedad: el precio no acepta el nuevo nivel, simplemente va allí a 'recoger' las órdenes y regresa.", "El barrido se forma visualmente como una mecha larga. En un barrido de mínimos, el precio cae por debajo de los equal lows, activa los stops y luego cierra de vuelta por encima del nivel.", "Los barridos de liquidez son particularmente importantes porque suelen preceder directamente al movimiento real en la dirección contraria. La secuencia clásica: liquidez → sweep → CHoCH → entrada.", "Para operar el barrido, se espera que ocurra y luego se busca confirmación de cambio de dirección. El stop se coloca por debajo del extremo de la mecha del barrido."],
    keys: ["Ruptura breve de un nivel seguida de reversión rápida; visible como mecha larga.", "Activa stops y órdenes acumuladas en el nivel barrido.", "Precede al movimiento real en la dirección contraria.", "La secuencia completa: liquidez → sweep → CHoCH → entrada.", "Stop bajo el extremo de la mecha del barrido para proteger la idea."],
    usage: "Identificá zonas de equal highs o equal lows donde hay stops acumulados. Cuando el precio las barra con mecha larga y cierre de vuelta, buscá CHoCH o vela de confirmación para entrar.",
    summary: "El barrido de liquidez es la firma institucional antes del movimiento real. Reconocerlo te permite entrar justo cuando la mayoría de traders acaban de ser sacados del mercado."
  },
  {
    id: 21, title: "Entrada institucional", tag: "Smart Money",
    subtitle: "El setup completo que combina liquidez, estructura y zona para alta probabilidad.",
    chartKind: "institutional",
    explanation: ["La entrada institucional no es un único indicador, sino una secuencia lógica y completa de eventos del mercado. Es la integración de todos los conceptos del análisis institucional en una narrativa coherente.", "La secuencia clásica alcista: primero liquidez acumulada visible debajo del precio. Segundo, el precio barre esa liquidez (sweep). Tercero, CHoCH al romper la microestructura. Cuarto, retroceso hacia un FVG u OB. Quinto, confirmación en esa zona.", "Cada elemento tiene su función: la liquidez tomada genera el combustible, el CHoCH confirma que el control cambió, y el retroceso al FVG/OB ofrece la entrada con el mejor precio.", "La paciencia es el ingrediente invisible. Muchos traders ven el CHoCH y entran inmediatamente, perdiendo la oportunidad de esperar el retroceso a la zona de valor."],
    keys: ["Secuencia completa: liquidez → sweep → CHoCH → retroceso a FVG/OB → entrada.", "Cada elemento tiene su función; si falta uno, la probabilidad disminuye.", "No entrar en el CHoCH; esperar el retroceso a la zona de valor.", "Buscar confirmación en la zona de valor antes de ejecutar.", "Stop bajo el extremo del sweep; objetivo en la siguiente zona de liquidez."],
    usage: "Esperá la secuencia completa: identificá liquidez acumulada, observá el sweep, confirmá el CHoCH, esperá retroceso a FVG u OB, buscá confirmación y entrá con stop bajo el sweep.",
    summary: "La entrada institucional es el setup de mayor probabilidad porque combina múltiples confluencias en una narrativa coherente. Requiere paciencia pero ofrece la mejor relación riesgo-beneficio."
  },
  {
    id: 22, title: "Confirmación", tag: "Entrada",
    subtitle: "La señal final que reduce la incertidumbre y justifica la ejecución.",
    chartKind: "confirmation",
    explanation: ["La confirmación es la señal que finalmente justifica la ejecución. Puede ser una vela de acción del precio (pin bar, engulfing), una ruptura de microestructura en timeframe menor, o un indicador técnico que converja con el análisis estructural.", "Sin confirmación, operar 'porque el precio tocó la zona' es equivalente a intentar atrapar cuchillos. La zona puede ser válida pero el precio puede seguir moviéndose en tu contra antes de reaccionar.", "Los tipos más comunes de confirmación incluyen: la vela engulfing, el pin bar, y la ruptura de microestructura (CHoCH mini en el timeframe menor).", "La calidad de la confirmación también importa. Una confirmación en timeframe mayor tiene más peso que una en M5. Aprender a calificar las confirmaciones es parte del desarrollo como trader."],
    keys: ["La señal final que justifica ejecutar la operación en la zona de interés.", "Evita entrar 'porque tocó la zona' sin ver reacción del precio.", "Tipos comunes: engulfing, pin bar, ruptura de microestructura.", "La confirmación en timeframe mayor tiene más peso.", "Calificar la calidad de la confirmación: no todas son igualmente válidas."],
    usage: "Antes de entrar en cualquier zona de valor, definí qué tipo de confirmación necesitás ver. Solo ejecutá cuando esa señal aparezca, sin excepciones.",
    summary: "La confirmación es el filtro que separa las entradas de calidad de las impulsivas. Exige que el precio muestre que la zona está siendo respetada antes de comprometer capital."
  },
  {
    id: 23, title: "Impulso", tag: "Estructura",
    subtitle: "Movimiento fuerte y decisivo que desplaza el precio con convicción.",
    chartKind: "impulse",
    explanation: ["El impulso es un movimiento de precio fuerte, rápido y decisivo que desplaza el precio significativamente en una dirección, generalmente dejando evidencia estructural como FVGs, order blocks y rupturas de estructura.", "Los impulsos son el combustible de las tendencias. Entre impulso e impulso suele haber correcciones o consolidaciones, que son las oportunidades de entrada para participar en el siguiente impulso.", "La importancia técnica del impulso es que genera las zonas que luego usamos para operar. Un impulso alcista deja FVGs alcistas, establece un nuevo order block, y rompe estructuras (BOS).", "El impulso nunca se opera directamente. Su función es definir la dirección y generar las zonas donde buscaremos la entrada en el siguiente retroceso."],
    keys: ["Movimiento fuerte con velas de cuerpo grande y desplazamiento significativo.", "Genera FVGs, order blocks y rupturas de estructura como evidencia.", "Define la dirección del mercado y crea las zonas de entrada.", "No se opera directamente; se espera el retroceso para entrar.", "El volumen acompañante confirma la legitimidad del impulso."],
    usage: "Cuando identificás un impulso, marcá el FVG y el OB que dejó. Esperá que el precio retroceda a esas zonas para buscar entrada en la dirección del impulso.",
    summary: "El impulso define la dirección y crea las zonas que usamos para operar. Las mejores entradas están en los retrocesos a las zonas que el impulso genera."
  },
  {
    id: 24, title: "Retroceso", tag: "Estructura",
    subtitle: "Movimiento correctivo contra el impulso principal que ofrece la entrada.",
    chartKind: "correction",
    explanation: ["El retroceso o corrección es el movimiento de precio que va en contra de la dirección del impulso principal. Es la 'pausa' del mercado antes de continuar en la dirección dominante. Los retrocesos son naturales e inevitables: ningún mercado sube o baja en línea recta.", "Los retrocesos sanos tienen características identificables: velas más pequeñas que las del impulso, menor volumen, y se detienen antes de violar el último Higher Low estructural.", "La profundidad del retroceso es otro indicador de salud. Los retrocesos más comunes se detienen entre el 38.2% y el 61.8% del impulso anterior (niveles de Fibonacci).", "Un retroceso que supera el 100% del impulso anterior puede ser una reversión, no un retroceso. Este es el límite técnico que define si la idea de continuación sigue siendo válida."],
    keys: ["Movimiento contrario al impulso principal; natural e inevitable en todo mercado.", "Velas más pequeñas y menor volumen que el impulso: señal de salud.", "Se detiene en zonas de valor: FVG, OB, soporte/resistencia institucional.", "Si viola el punto de inicio del impulso, puede ser reversión, no retroceso.", "La zona donde se detiene el retroceso es la zona de entrada."],
    usage: "Después de un impulso, esperá el retroceso a la zona de valor marcada (FVG, OB). Observá la calidad del retroceso: pocas velas pequeñas es más sano. Buscá confirmación para entrar.",
    summary: "El retroceso es la oportunidad de entrar en la dirección del impulso con el mejor precio. La zona donde se detiene es la zona de valor, y su calidad indica que la tendencia sigue sana."
  },
  {
    id: 25, title: "Acumulación", tag: "Ciclo de mercado",
    subtitle: "Fase de consolidación donde las instituciones construyen posiciones compradoras.",
    chartKind: "accumulation",
    explanation: ["La acumulación es una fase que ocurre típicamente después de una tendencia bajista significativa. Aparece como una consolidación lateral en la parte baja del gráfico. Durante este período, se interpreta que las instituciones están comprando gradualmente a precios favorables antes del siguiente movimiento alcista.", "La fase de acumulación tiene una estructura interna característica. El precio forma un rango con soporte y resistencia. Dentro del rango, son comunes los barridos hacia abajo que activan stops de compradores y recogen liquidez barata.", "La confirmación de que la acumulación terminó llega con la ruptura del techo del rango de manera convincente, seguida de un retesteo exitoso de ese techo como soporte.", "No toda consolidación es acumulación. La diferencia a veces solo se confirma con la dirección de la ruptura."],
    keys: ["Consolidación lateral en zona baja después de tendencia bajista.", "Las instituciones compran gradualmente sin mover el precio significativamente.", "Los barridos de mínimos dentro del rango son señales de absorción institucional.", "Confirmación: ruptura alcista del techo del rango con retesteo exitoso.", "Contexto previo (tendencia bajista larga + zona de demanda) aumenta probabilidad."],
    usage: "Identificá rangos laterales en zonas de demanda históricas después de caídas prolongadas. Observá barridos de los mínimos del rango. Cuando el techo se rompa, buscá retesteo para entrar alcista.",
    summary: "La acumulación es donde las instituciones se posicionan silenciosamente antes de una expansión alcista. Reconocerla permite entrar temprano en el movimiento antes de que el precio suba significativamente."
  },
  {
    id: 26, title: "Distribución", tag: "Ciclo de mercado",
    subtitle: "Fase de consolidación donde las instituciones venden sus posiciones compradoras.",
    chartKind: "distribution",
    explanation: ["La distribución es la fase opuesta a la acumulación. Ocurre después de una tendencia alcista significativa y aparece como una consolidación lateral en la parte alta del gráfico. Las instituciones están vendiendo gradualmente sus posiciones a los traders minoristas que compran eufóricos.", "Dentro del rango de distribución, son comunes los barridos de los máximos: el precio sube falsamente, atrae compradores de breakout y luego revierte con fuerza.", "La confirmación llega con la ruptura del soporte del rango hacia abajo, seguida del retesteo de ese soporte como resistencia.", "Psicológicamente, la distribución ocurre en el momento de mayor euforia del mercado, cuando los medios son más alcistas. Esto la hace difícil de detectar para quien no conoce la estructura."],
    keys: ["Consolidación lateral en zona alta después de tendencia alcista.", "Las instituciones venden sus posiciones a los compradores minoristas.", "Los barridos de máximos dentro del rango son señales de distribución.", "Confirmación: ruptura bajista del soporte del rango con retesteo como resistencia.", "Ocurre en momentos de euforia; difícil de detectar sin conocer la estructura."],
    usage: "Identificá rangos laterales en zonas de oferta históricas después de subidas prolongadas. Observá barridos repetidos de los máximos del rango. Cuando el soporte se rompa, buscá retesteo para entrar bajista.",
    summary: "La distribución es donde las instituciones salen silenciosamente mientras los minoristas compran eufóricos. Reconocerla permite posicionarse corto antes de la caída que sigue."
  },
  {
    id: 27, title: "Psicología del trader", tag: "Mentalidad",
    subtitle: "El control emocional que determina si ejecutás el plan o reaccionás al miedo.",
    chartKind: "psychology",
    explanation: ["La psicología del trader es el factor determinante en el éxito o fracaso a largo plazo. Se puede tener la mejor estrategia del mundo, pero si la ejecución está contaminada por el miedo, la codicia o el ego, los resultados serán inconsistentes.", "Los sesgos emocionales más comunes: el FOMO (entrar tarde por miedo a perdérselo), el trading de revancha (operar para recuperar pérdidas), la sobreconfianza después de rachas ganadoras.", "El ciclo emocional del mercado opera en contra del trader típico: optimismo en la entrada, euforia cuando gana, pánico cuando revierte, capitulación en el stop.", "Las herramientas prácticas incluyen: el diario de trading, el plan con reglas claras, los límites de pérdida diaria, y la práctica de mindfulness."],
    keys: ["Las emociones (miedo, codicia, euforia) sabotean la ejecución del plan.", "FOMO, revancha y sobreconfianza son los enemigos más comunes.", "El ciclo emocional del mercado opera en contra del trader típico.", "El trading psicológicamente sano es aburrido: sin drama emocional.", "Herramientas: diario, plan con reglas, límites de pérdida, mindfulness."],
    usage: "Antes de abrir el gráfico, evaluá tu estado emocional. Si estás ansioso, enojado o eufórico, tomá distancia. Operá solo cuando estés en un estado neutral.",
    summary: "La psicología es el factor limitante cuando la estrategia ya es sólida. Desarrollar disciplina emocional y crear rutinas que neutralicen las emociones es el trabajo más importante del trader avanzado."
  },
  {
    id: 28, title: "Diario de trading", tag: "Proceso",
    subtitle: "El registro sistemático que convierte la experiencia en mejora medible.",
    chartKind: "journal",
    explanation: ["El diario de trading registra de manera sistemática todas las operaciones: la razón de entrada, el análisis previo, el resultado, las emociones y las lecciones aprendidas. Su propósito es convertir la experiencia subjetiva en datos objetivos.", "Sin un diario, el trader aprende muy lentamente porque su único feedback es la memoria, que es selectiva. Con un diario bien llevado, puede descubrir patrones que nunca habría notado.", "Un diario efectivo debe incluir: captura de pantalla del gráfico, tipo de setup, timeframe, sesión, R:R planificado vs real, resultado, emociones y reflexión breve.", "La revisión periódica del diario —semanal y mensual— es tan importante como el registro mismo. Es donde se extraen las conclusiones y se construye el edge personal."],
    keys: ["Registrá cada operación con captura de pantalla, setup, resultado y emociones.", "Convierte la experiencia subjetiva en datos objetivos y analizables.", "Incluir: entrada, análisis, resultado, R:R planificado vs real, reflexión.", "La revisión semanal y mensual es donde se extraen las conclusiones reales.", "Permite identificar qué setups y horarios tienen mayor edge personal."],
    usage: "Antes de cerrar cada operación, tomá captura del gráfico. Registrá el setup, el resultado en R, tu estado emocional y una reflexión de 2-3 líneas. Revisá el diario cada semana.",
    summary: "El diario de trading es el sistema de mejora continua más poderoso. Sin él, la experiencia es anécdota. Con él, se convierte en datos accionables que dirigen la mejora de manera sistemática."
  },
  {
    id: 29, title: "Plan de trading", tag: "Proceso",
    subtitle: "El conjunto de reglas que elimina las decisiones emocionales en el momento.",
    chartKind: "plan",
    explanation: ["El plan de trading es un documento escrito que define con precisión las condiciones bajo las cuales vas a operar: qué setups buscás, en qué timeframes, en qué sesiones, cuánto arriesgás por operación.", "Sin un plan, cada decisión se toma en el contexto emocional del momento. El plan es el antídoto porque establece condiciones objetivas: 'entro cuando se cumplan X, Y y Z; si no, no entro'.", "Un plan efectivo debe responder: ¿Qué activos operás? ¿En qué timeframes? ¿En qué sesiones? ¿Cuáles son los setups válidos? ¿Cuánto arriesgás? ¿Cuál es tu límite diario?", "El plan no es estático. Se revisa y actualiza periódicamente en función de los datos del diario de trading."],
    keys: ["Documento escrito con reglas claras para cada decisión de trading.", "Elimina la toma de decisiones emocionales en el momento de mercado.", "Debe definir: setups, timeframes, sesiones, riesgo, límites y gestión.", "Se opera solo cuando se cumplen las condiciones del plan; sin excepciones.", "Se actualiza periódicamente con base en los datos del diario."],
    usage: "Escribí tu plan antes de abrir los gráficos. Definí exactamente qué condiciones deben cumplirse para entrar. Si el mercado no muestra esas condiciones, no operés.",
    summary: "El plan de trading es el sistema que hace que el trading sea reproducible y consistente. Convierte la estrategia en reglas y las reglas en hábitos."
  },
  {
    id: 30, title: "Backtesting", tag: "Proceso",
    subtitle: "Probar una estrategia en datos históricos para validar su edge real.",
    chartKind: "backtesting",
    explanation: ["El backtesting es el proceso de aplicar las reglas de una estrategia a datos históricos para evaluar cómo habría funcionado. Es el método científico aplicado al trading: en lugar de operar con fe, primero se verifica si la estrategia tiene un edge estadístico medible.", "Un backtesting riguroso requiere reglas completamente objetivas, muestra mínima de 50-100 operaciones, período que incluya diferentes condiciones de mercado, y honestidad del evaluador.", "Las métricas clave: tasa de aciertos, R:R promedio real, profit factor (debe ser mayor a 1.5), drawdown máximo, y expectativa matemática.", "El backtesting tiene limitaciones importantes. El 'curve fitting' —ajustar las reglas hasta que funcionan en el histórico— es una trampa común. La solución es el forward testing en demo antes de escalar capital real."],
    keys: ["Aplicar las reglas de la estrategia a datos históricos antes de operar en real.", "Requiere reglas objetivas, muestra mínima de 50-100 operaciones y honestidad.", "Métricas clave: win rate, profit factor (>1.5), drawdown, expectativa matemática.", "Evitar sobreoptimización: no cambiar reglas para que 'funcionen en el pasado'.", "Complementar con forward testing en demo antes de escalar capital real."],
    usage: "Definí tus reglas de manera objetiva. Aplicálas a 3-6 meses de datos históricos, registrando cada operación. Analizá el profit factor y el drawdown antes de operar en real.",
    summary: "El backtesting es la validación científica de una estrategia. Sin él, se opera con fe; con él, se opera con evidencia. Es el paso imprescindible para convertir una idea en un sistema confiable."
  }
];

// ═══════════════════════════════════════════════════════
//  CHART STYLE — matches reference image style
// ═══════════════════════════════════════════════════════

const BG        = "#0d1117";   // near-black background
const GRID      = "#1c2333";   // subtle grid
const BULL_BODY = "#26a269";   // bright green candles
const BULL_WICK = "#1a7a4e";
const BEAR_BODY = "#e03131";   // bright red candles
const BEAR_WICK = "#b02828";

/** Price → Y pixel  (top/bottom are pixel bounds of chart area) */
function py(price: number, minP: number, maxP: number, top = 28, bottom = 218): number {
  return top + ((maxP - price) / (maxP - minP)) * (bottom - top);
}

interface CD { o: number; h: number; l: number; c: number }

/** Single candle */
function Candle({ x, c: candle, min, max, w = 15 }: {
  x: number; c: CD; min: number; max: number; w?: number
}) {
  const bull = candle.c >= candle.o;
  const bodyTop = py(Math.max(candle.o, candle.c), min, max);
  const bodyBot = py(Math.min(candle.o, candle.c), min, max);
  const bodyH   = Math.max(3, bodyBot - bodyTop);
  return (
    <g>
      <line x1={x} y1={py(candle.h, min, max)} x2={x} y2={py(candle.l, min, max)}
        stroke={bull ? BULL_WICK : BEAR_WICK} strokeWidth="1.8" />
      <rect x={x - w / 2} y={bodyTop} width={w} height={bodyH}
        fill={bull ? BULL_BODY : BEAR_BODY} rx="1.5" />
    </g>
  );
}

/** Subtle horizontal grid lines */
function Grid({ levels, min, max }: { levels: number[]; min: number; max: number }) {
  return <>{levels.map(p => (
    <line key={p} x1={26} y1={py(p, min, max)} x2={494} y2={py(p, min, max)}
      stroke={GRID} strokeWidth="1" />
  ))}</>;
}

/** Prominent dashed line — matches reference style */
function DLine({ y, x1 = 26, x2 = 494, color, dash = "9 5" }: {
  y: number; x1?: number; x2?: number; color: string; dash?: string
}) {
  return <line x1={x1} y1={y} x2={x2} y2={y}
    stroke={color} strokeWidth="1.5" strokeDasharray={dash} opacity="0.9" />;
}

/** Filled zone box with dashed borders — matches reference */
function Zone({ x1, x2, y1, y2, color }: { x1: number; x2: number; y1: number; y2: number; color: string }) {
  return (
    <g>
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} fill={color} opacity="0.12" />
      <line x1={x1} y1={y1} x2={x2} y2={y1} stroke={color} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.85" />
      <line x1={x1} y1={y2} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.85" />
    </g>
  );
}

/** Solid label box — matches the reference style labels */
function Lbl({ x, y, text, bg = "#1e2535", fg = "#e8ecf4", size = 9, anchor = "middle" as "middle"|"start"|"end", fw = "800" }: {
  x: number; y: number; text: string; bg?: string; fg?: string; size?: number;
  anchor?: "middle"|"start"|"end"; fw?: string
}) {
  const approxW = text.length * size * 0.60 + 12;
  const dx = anchor === "middle" ? -approxW / 2 : anchor === "end" ? -approxW : 0;
  return (
    <g>
      <rect x={x + dx} y={y - size - 3} width={approxW} height={size + 10}
        fill={bg} rx="3" opacity="0.97" />
      <text x={x + dx + approxW / 2} y={y + 2}
        textAnchor="middle" fill={fg} fontSize={size} fontWeight={fw}>{text}</text>
    </g>
  );
}

/** Arrow marker + line */
function Arrow({ x1, y1, x2, y2, color, id }: {
  x1: number; y1: number; x2: number; y2: number; color: string; id: string
}) {
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
          <path d="M0,0 L0,8 L10,4 z" fill={color} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="3.5" markerEnd={`url(#${id})`} />
    </g>
  );
}

// ═══════════════════════════════════════════════════════
//  CHART COMPONENTS — one per concept
// ═══════════════════════════════════════════════════════

function ChartLiquidity({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 28, max = 98;
  const candles: CD[] = bull ? [
    { o:68,h:74,l:60,c:63 }, { o:63,h:70,l:57,c:61 }, { o:61,h:67,l:55,c:64 },
    { o:64,h:68,l:54,c:59 }, { o:59,h:62,l:42,c:50 }, // sweep
    { o:50,h:80,l:48,c:77 }, { o:77,h:88,l:73,c:85 }, { o:85,h:96,l:81,c:93 },
  ] : [
    { o:50,h:60,l:44,c:56 }, { o:56,h:64,l:52,c:61 }, { o:61,h:68,l:55,c:64 },
    { o:64,h:70,l:58,c:66 }, { o:66,h:84,l:64,c:76 }, // sweep
    { o:76,h:77,l:50,c:54 }, { o:54,h:56,l:40,c:43 }, { o:43,h:45,l:30,c:32 },
  ];
  const xs = [50,96,142,190,248,316,384,454];
  const eqY   = bull ? py(57,min,max) : py(65,min,max);
  const swpExt = bull ? py(42,min,max) : py(84,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[38,54,70,86]} min={min} max={max}/>

      {/* Equal levels dashed */}
      <DLine y={eqY} color="#facc15"/>
      <Lbl x={260} y={eqY-9} text={bull?"ZONA DE LIQUIDEZ  (equal lows)":"ZONA DE LIQUIDEZ  (equal highs)"} bg="#78350f" fg="#fde68a" size={8.5}/>

      {/* Sweep zone */}
      <Zone x1={220} x2={286} y1={Math.min(eqY,swpExt)-4} y2={Math.max(eqY,swpExt)+4} color="#f97316"/>
      <Lbl x={253} y={(eqY+swpExt)/2+5} text="BARRIDO DE LIQUIDEZ" bg="#c2410c" fg="#fff" size={8}/>

      {/* Candles */}
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}

      {/* Direction arrow */}
      <Arrow x1={xs[5]+10} y1={bull?py(62,min,max):py(70,min,max)}
             x2={xs[5]+10} y2={bull?py(90,min,max):py(36,min,max)}
             color={bull?"#26a269":"#e03131"} id={`liq-${mode}`}/>
      <Lbl x={xs[6]+18} y={bull?py(93,min,max):py(33,min,max)}
           text={bull?"MOVIMIENTO ALCISTA":"MOVIMIENTO BAJISTA"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8.5} anchor="start"/>

      {/* Top label */}
      <DLine y={bull?py(93,min,max):py(34,min,max)} x1={xs[4]} x2={494} color={bull?"#26a269":"#e03131"} dash="5 4"/>
      <Lbl x={260} y={bull?py(97,min,max):py(31,min,max)}
           text={bull?"LIQUIDEZ POR ENCIMA":"LIQUIDEZ POR DEBAJO"} bg="#1e293b" fg="#94a3b8" size={8}/>
    </svg>
  );
}

function ChartFVG({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 20, max = 100;
  const candles: CD[] = bull ? [
    { o:40,h:50,l:36,c:46 }, { o:46,h:56,l:42,c:52 },
    { o:52,h:96,l:50,c:92 }, // impulse → FVG between 56..80
    { o:92,h:98,l:86,c:91 }, { o:91,h:93,l:60,c:64 }, // retrace
    { o:64,h:78,l:62,c:75 }, { o:75,h:90,l:72,c:87 }, { o:87,h:97,l:83,c:94 },
  ] : [
    { o:88,h:94,l:80,c:83 }, { o:83,h:85,l:72,c:76 },
    { o:76,h:77,l:32,c:36 }, // impulse → FVG between 72..46
    { o:36,h:40,l:28,c:33 }, { o:33,h:68,l:31,c:64 }, // retrace
    { o:64,h:66,l:48,c:51 }, { o:51,h:53,l:36,c:39 }, { o:39,h:41,l:27,c:29 },
  ];
  const xs = [46,94,150,208,272,336,400,462];
  const fvgTop = bull ? py(80,min,max) : py(72,min,max);
  const fvgBot = bull ? py(56,min,max) : py(46,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[34,54,72,90]} min={min} max={max}/>
      <Zone x1={102} x2={494} y1={fvgTop} y2={fvgBot} color="#818cf8"/>
      <Lbl x={260} y={fvgTop-9} text="FAIR VALUE GAP (FVG)" bg="#3730a3" fg="#c7d2fe" size={9.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Arrow x1={xs[4]} y1={bull?py(88,min,max):py(36,min,max)}
             x2={xs[4]} y2={bull?py(75,min,max):py(58,min,max)}
             color="#818cf8" id={`fvg-${mode}`}/>
      <Lbl x={xs[4]+20} y={bull?py(78,min,max):py(54,min,max)}
           text="RETORNO AL FVG" bg="#3730a3" fg="#c7d2fe" size={8} anchor="start"/>
    </svg>
  );
}

function ChartOrderBlock({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 18, max = 98;
  const candles: CD[] = bull ? [
    { o:66,h:72,l:56,c:60 }, { o:60,h:66,l:50,c:54 },
    { o:54,h:60,l:44,c:48 }, // OB — last bear before impulse
    { o:48,h:90,l:46,c:86 }, // impulse
    { o:86,h:92,l:78,c:82 }, { o:82,h:84,l:50,c:54 }, // retrace to OB
    { o:54,h:80,l:52,c:77 }, { o:77,h:92,l:73,c:89 },
  ] : [
    { o:48,h:56,l:42,c:53 }, { o:53,h:62,l:49,c:59 },
    { o:59,h:70,l:55,c:66 }, // OB — last bull before impulse
    { o:66,h:67,l:30,c:34 }, // impulse
    { o:34,h:38,l:26,c:30 }, { o:30,h:70,l:28,c:66 }, // retrace to OB
    { o:66,h:68,l:40,c:43 }, { o:43,h:45,l:26,c:28 },
  ];
  const xs = [46,94,146,204,264,328,392,456];
  const obTop = bull ? py(60,min,max) : py(70,min,max);
  const obBot = bull ? py(44,min,max) : py(55,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,48,66,84]} min={min} max={max}/>
      <Zone x1={116} x2={494} y1={obTop} y2={obBot} color="#f97316"/>
      <Lbl x={260} y={(obTop+obBot)/2+5} text="ORDER BLOCK" bg="#9a3412" fg="#ffedd5" size={10}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[2]} y={bull?py(82,min,max):py(40,min,max)}
           text={bull?"ÚLTIMA VELA BAJISTA":"ÚLTIMA VELA ALCISTA"} bg="#1e293b" fg="#fdba74" size={7.5}/>
      <Arrow x1={xs[6]} y1={bull?py(60,min,max):py(64,min,max)}
             x2={xs[6]} y2={bull?py(84,min,max):py(36,min,max)}
             color={bull?"#26a269":"#e03131"} id={`ob-${mode}`}/>
    </svg>
  );
}

function ChartBOS({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 14, max = 100;
  const candles: CD[] = bull ? [
    { o:40,h:54,l:36,c:50 }, { o:50,h:64,l:46,c:60 }, // prev HH=64
    { o:60,h:62,l:48,c:52 }, { o:52,h:56,l:44,c:50 },
    { o:50,h:82,l:48,c:78 }, // BOS breaks 64
    { o:78,h:88,l:72,c:84 }, { o:84,h:94,l:80,c:91 }, { o:91,h:98,l:86,c:95 },
  ] : [
    { o:82,h:88,l:70,c:73 }, { o:73,h:76,l:58,c:62 }, // prev LL=58
    { o:62,h:68,l:56,c:65 }, { o:65,h:70,l:60,c:66 },
    { o:66,h:68,l:38,c:42 }, // BOS breaks 58
    { o:42,h:46,l:30,c:33 }, { o:33,h:37,l:24,c:27 }, { o:27,h:30,l:18,c:20 },
  ];
  const xs = [46,96,152,206,268,334,400,464];
  const bosLvl = bull ? py(64,min,max) : py(58,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,48,66,84]} min={min} max={max}/>
      <DLine y={bosLvl} color="#facc15"/>
      <Lbl x={38} y={bosLvl-8} text={bull?"MÁXIMO PREVIO":"MÍNIMO PREVIO"} bg="#78350f" fg="#fde68a" size={8.5} anchor="start"/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <rect x={238} y={bosLvl-14} width={60} height={22} fill="#7c3aed" rx="4"/>
      <text x={268} y={bosLvl+2} textAnchor="middle" fill="#fff" fontSize={12} fontWeight="900">BOS</text>
      <Arrow x1={258} y1={bosLvl+(bull?6:-6)} x2={258} y2={bull?bosLvl-30:bosLvl+30}
             color={bull?"#26a269":"#e03131"} id={`bos-${mode}`}/>
    </svg>
  );
}

function ChartCHoCH({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 20, max = 100;
  const candles: CD[] = bull ? [
    { o:84,h:90,l:74,c:77 }, { o:77,h:80,l:64,c:67 },
    { o:67,h:70,l:52,c:55 }, { o:55,h:58,l:38,c:42 }, // sweep low
    { o:42,h:74,l:40,c:70 }, { o:70,h:82,l:66,c:79 }, // CHoCH
    { o:79,h:90,l:75,c:87 }, { o:87,h:96,l:82,c:93 },
  ] : [
    { o:38,h:48,l:34,c:44 }, { o:44,h:58,l:40,c:54 },
    { o:54,h:70,l:51,c:66 }, { o:66,h:82,l:63,c:78 }, // sweep high
    { o:78,h:80,l:54,c:57 }, { o:57,h:60,l:44,c:47 }, // CHoCH
    { o:47,h:50,l:34,c:37 }, { o:37,h:40,l:26,c:28 },
  ];
  const xs = [42,90,140,198,262,326,390,454];
  const chochY = bull ? py(70,min,max) : py(54,min,max);
  const sweepY = bull ? py(38,min,max) : py(82,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[30,50,68,86]} min={min} max={max}/>
      <DLine y={chochY} color="#a78bfa"/>
      <Lbl x={38} y={chochY-8} text={bull?"ÚLTIMO LH (microestructura)":"ÚLTIMO HL (microestructura)"} bg="#5b21b6" fg="#ddd6fe" size={8} anchor="start"/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[3]} y={sweepY+(bull?14:-8)} text={bull?"SWEEP ↓":"SWEEP ↑"} bg="#9a3412" fg="#fff" size={9}/>
      <rect x={294} y={chochY-14} width={76} height={22} fill="#7c3aed" rx="4"/>
      <text x={332} y={chochY+2} textAnchor="middle" fill="#fff" fontSize={11} fontWeight="900">CHoCH</text>
      <Arrow x1={xs[5]+8} y1={bull?py(58,min,max):py(62,min,max)}
             x2={xs[5]+8} y2={bull?py(86,min,max):py(38,min,max)}
             color={bull?"#26a269":"#e03131"} id={`choch-${mode}`}/>
    </svg>
  );
}

function ChartSupport({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 10, max = 100;
  const candles: CD[] = bull ? [
    { o:78,h:86,l:66,c:70 }, { o:70,h:73,l:52,c:57 }, // 1st touch
    { o:57,h:72,l:50,c:69 }, { o:69,h:80,l:64,c:76 },
    { o:76,h:78,l:54,c:58 }, // 2nd touch
    { o:58,h:84,l:55,c:81 }, { o:81,h:92,l:77,c:89 }, { o:89,h:98,l:84,c:95 },
  ] : [
    { o:56,h:62,l:48,c:52 }, { o:52,h:56,l:40,c:44 },
    { o:44,h:56,l:40,c:53 }, // fake bounce
    { o:53,h:55,l:38,c:42 }, // break
    { o:42,h:46,l:26,c:30 }, { o:30,h:48,l:28,c:44 }, // retest as resistance
    { o:44,h:46,l:26,c:29 }, { o:29,h:31,l:16,c:18 },
  ];
  const xs = [46,96,150,208,270,334,396,460];
  const supY = py(54,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[22,44,64,82]} min={min} max={max}/>
      <Zone x1={26} x2={494} y1={supY-10} y2={supY+10} color="#26a269"/>
      <Lbl x={260} y={supY-14} text="ZONA DE SOPORTE" bg="#14532d" fg="#bbf7d0" size={10}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      {bull ? <>
        <Lbl x={xs[1]} y={py(48,min,max)} text="1° toque" bg="#1e293b" fg="#86efac" size={7.5}/>
        <Lbl x={xs[4]} y={py(50,min,max)} text="2° toque → entrada" bg="#14532d" fg="#fff" size={7.5}/>
        <Arrow x1={xs[5]} y1={py(62,min,max)} x2={xs[5]} y2={py(84,min,max)} color="#26a269" id="sup-bull"/>
      </> : <>
        <Lbl x={xs[3]+16} y={py(34,min,max)} text="RUPTURA ↓" bg="#7f1d1d" fg="#fff" size={8.5} anchor="start"/>
        <Lbl x={xs[5]} y={py(50,min,max)} text="AHORA RESISTENCIA" bg="#7f1d1d" fg="#fca5a5" size={7.5}/>
        <Arrow x1={xs[6]} y1={py(42,min,max)} x2={xs[6]} y2={py(22,min,max)} color="#e03131" id="sup-bear"/>
      </>}
    </svg>
  );
}

function ChartResistance({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 16, max = 100;
  const candles: CD[] = bull ? [
    { o:38,h:48,l:34,c:44 }, { o:44,h:58,l:40,c:54 },
    { o:54,h:76,l:51,c:72 }, // breaks resistance
    { o:72,h:84,l:68,c:80 }, { o:80,h:82,l:70,c:74 }, // retest
    { o:74,h:90,l:71,c:87 }, { o:87,h:96,l:82,c:93 }, { o:93,h:99,l:88,c:96 },
  ] : [
    { o:44,h:50,l:38,c:47 }, { o:47,h:62,l:44,c:58 },
    { o:58,h:76,l:55,c:72 }, { o:72,h:82,l:68,c:70 }, // rejection
    { o:70,h:72,l:52,c:55 }, { o:55,h:58,l:40,c:42 },
    { o:42,h:45,l:28,c:31 }, { o:31,h:34,l:20,c:22 },
  ];
  const xs = [46,96,150,210,270,334,396,460];
  const resY = py(74,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,50,68,86]} min={min} max={max}/>
      <Zone x1={26} x2={494} y1={resY-10} y2={resY+10} color="#e03131"/>
      <Lbl x={260} y={resY+24} text="ZONA DE RESISTENCIA" bg="#7f1d1d" fg="#fca5a5" size={10}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      {bull ? <>
        <Lbl x={xs[2]+16} y={py(84,min,max)} text="ROMPE ↑" bg="#14532d" fg="#fff" size={8.5} anchor="start"/>
        <Lbl x={xs[4]} y={py(68,min,max)} text="RETESTEO → SOPORTE" bg="#14532d" fg="#fff" size={7.5}/>
        <Arrow x1={xs[5]} y1={py(76,min,max)} x2={xs[5]} y2={py(92,min,max)} color="#26a269" id="res-bull"/>
      </> : <>
        <Lbl x={xs[3]} y={py(88,min,max)} text="RECHAZO ↓" bg="#7f1d1d" fg="#fff" size={9}/>
        <Arrow x1={xs[4]} y1={py(70,min,max)} x2={xs[4]} y2={py(44,min,max)} color="#e03131" id="res-bear"/>
      </>}
    </svg>
  );
}

function ChartUptrend({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 18, max = 100;
  const candles: CD[] = bull ? [
    { o:34,h:52,l:30,c:48 }, { o:48,h:66,l:44,c:62 },
    { o:62,h:64,l:50,c:53 }, { o:53,h:76,l:50,c:72 },
    { o:72,h:74,l:60,c:63 }, { o:63,h:88,l:60,c:84 },
    { o:84,h:86,l:72,c:75 }, { o:75,h:98,l:72,c:94 },
  ] : [
    { o:34,h:52,l:30,c:48 }, { o:48,h:66,l:44,c:62 },
    { o:62,h:64,l:50,c:53 }, { o:53,h:76,l:50,c:72 },
    { o:72,h:74,l:50,c:53 }, // fails HL
    { o:53,h:56,l:38,c:41 }, { o:41,h:44,l:27,c:29 }, { o:29,h:32,l:18,c:20 },
  ];
  const xs = [42,90,144,200,260,322,386,452];

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[30,50,70,88]} min={min} max={max}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      {bull ? <>
        <Lbl x={xs[1]} y={py(70,min,max)} text="HH1" bg="#14532d" fg="#bbf7d0" size={8.5}/>
        <Lbl x={xs[2]} y={py(47,min,max)} text="HL1" bg="#1e3a5f" fg="#bfdbfe" size={8.5}/>
        <Lbl x={xs[3]} y={py(80,min,max)} text="HH2" bg="#14532d" fg="#bbf7d0" size={8.5}/>
        <Lbl x={xs[4]} y={py(57,min,max)} text="HL2" bg="#1e3a5f" fg="#bfdbfe" size={8.5}/>
        <Lbl x={xs[5]} y={py(92,min,max)} text="HH3" bg="#14532d" fg="#bbf7d0" size={8.5}/>
        <Lbl x={xs[6]} y={py(69,min,max)} text="HL3" bg="#1e3a5f" fg="#bfdbfe" size={8.5}/>
        <Lbl x={xs[7]} y={py(98,min,max)} text="HH4" bg="#14532d" fg="#bbf7d0" size={8.5}/>
      </> : <>
        <Lbl x={xs[1]} y={py(70,min,max)} text="HH" bg="#14532d" fg="#bbf7d0" size={8.5}/>
        <Lbl x={xs[3]} y={py(80,min,max)} text="HH2" bg="#14532d" fg="#bbf7d0" size={8.5}/>
        <Lbl x={xs[4]+14} y={py(48,min,max)} text="⚠ PIERDE HL → INVALIDACIÓN" bg="#b45309" fg="#fff" size={8} anchor="start"/>
        <Arrow x1={xs[5]} y1={py(50,min,max)} x2={xs[5]} y2={py(30,min,max)} color="#e03131" id="upt-bear"/>
      </>}
    </svg>
  );
}

function ChartDowntrend({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 16, max = 98;
  const candles: CD[] = bull ? [
    { o:86,h:92,l:74,c:77 }, { o:77,h:80,l:60,c:64 },
    { o:64,h:74,l:58,c:70 }, { o:70,h:72,l:48,c:52 },
    { o:52,h:64,l:48,c:60 }, // LH fails → CHoCH
    { o:60,h:82,l:57,c:79 }, { o:79,h:94,l:75,c:91 }, { o:91,h:99,l:86,c:96 },
  ] : [
    { o:86,h:92,l:74,c:78 }, { o:78,h:80,l:60,c:63 },
    { o:63,h:74,l:58,c:70 }, { o:70,h:72,l:50,c:54 },
    { o:54,h:62,l:48,c:57 }, { o:57,h:59,l:36,c:39 },
    { o:39,h:48,l:34,c:43 }, { o:43,h:45,l:26,c:28 },
  ];
  const xs = [42,90,142,198,258,322,386,452];

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,48,66,84]} min={min} max={max}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      {!bull ? <>
        <Lbl x={xs[0]} y={py(96,min,max)} text="LH1" bg="#7f1d1d" fg="#fca5a5" size={8.5}/>
        <Lbl x={xs[1]} y={py(57,min,max)} text="LL1" bg="#b91c1c" fg="#fff" size={8.5}/>
        <Lbl x={xs[2]} y={py(76,min,max)} text="LH2" bg="#7f1d1d" fg="#fca5a5" size={8.5}/>
        <Lbl x={xs[3]} y={py(47,min,max)} text="LL2" bg="#b91c1c" fg="#fff" size={8.5}/>
        <Lbl x={xs[4]} y={py(62,min,max)} text="LH3" bg="#7f1d1d" fg="#fca5a5" size={8.5}/>
        <Lbl x={xs[5]} y={py(32,min,max)} text="LL3" bg="#b91c1c" fg="#fff" size={8.5}/>
      </> : <>
        <Lbl x={xs[3]+14} y={py(46,min,max)} text="LL2" bg="#b91c1c" fg="#fff" size={8.5} anchor="start"/>
        <Lbl x={xs[4]+14} y={py(54,min,max)} text="LH FALLA → CHoCH" bg="#7c3aed" fg="#fff" size={8} anchor="start"/>
        <Arrow x1={xs[5]} y1={py(62,min,max)} x2={xs[5]} y2={py(86,min,max)} color="#26a269" id="dt-bull"/>
      </>}
    </svg>
  );
}

function ChartRange({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const candles: CD[] = [
    { o:54,h:72,l:50,c:68 }, { o:68,h:74,l:56,c:60 },
    { o:60,h:66,l:48,c:52 }, { o:52,h:68,l:48,c:64 },
    { o:64,h:75,l:58,c:70 }, { o:70,h:76,l:52,c:56 },
    { o:56,h:64,l:48,c:61 }, { o:61,h:74,l:57,c:71 },
  ];
  const xs = [42,96,150,206,264,322,382,442];
  const min = 28, max = 96;
  const ceil  = py(74,min,max);
  const floor = py(48,min,max);
  const ctr   = (ceil+floor)/2;

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <rect x={26} y={ceil} width={468} height={floor-ceil} fill="#64748b" opacity="0.06"/>
      <DLine y={ceil} color="#e03131"/>
      <Lbl x={38} y={ceil-8} text="RESISTENCIA (TECHO)" bg="#7f1d1d" fg="#fca5a5" size={9} anchor="start"/>
      <DLine y={floor} color="#26a269"/>
      <Lbl x={38} y={floor+18} text="SOPORTE (PISO)" bg="#14532d" fg="#bbf7d0" size={9} anchor="start"/>
      <rect x={26} y={ctr-15} width={468} height={30} fill="#f59e0b" opacity="0.06"/>
      <DLine y={ctr} color="#f59e0b" dash="5 5"/>
      <Lbl x={260} y={ctr+5} text="⚠ CENTRO — PEOR R:R" bg="#78350f" fg="#fde68a" size={8.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Arrow x1={462} y1={bull?floor-8:ceil+8} x2={462} y2={bull?ceil+8:floor-8}
             color={bull?"#26a269":"#e03131"} id={`rng-${mode}`}/>
      <Lbl x={480} y={(ceil+floor)/2+5} text={bull?"COMPRA\nEN PISO":"VENTA\nEN TECHO"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={7.5} anchor="start"/>
    </svg>
  );
}

function ChartPullback({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 18, max = 100;
  const candles: CD[] = bull ? [
    { o:34,h:46,l:31,c:42 }, { o:42,h:76,l:40,c:72 }, // impulse
    { o:72,h:74,l:60,c:62 }, { o:62,h:65,l:50,c:53 },
    { o:53,h:58,l:47,c:55 }, // PB end
    { o:55,h:86,l:52,c:82 }, { o:82,h:94,l:78,c:91 }, { o:91,h:99,l:86,c:96 },
  ] : [
    { o:92,h:98,l:80,c:84 }, { o:84,h:86,l:54,c:58 }, // impulse
    { o:58,h:72,l:55,c:69 }, { o:69,h:76,l:63,c:72 },
    { o:72,h:76,l:64,c:68 }, // PB end
    { o:68,h:70,l:40,c:44 }, { o:44,h:47,l:30,c:32 }, { o:32,h:35,l:20,c:22 },
  ];
  const xs = [42,96,152,208,266,330,394,458];
  const pbT = bull ? py(76,min,max) : py(76,min,max);
  const pbB = bull ? py(48,min,max) : py(62,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,50,70,88]} min={min} max={max}/>
      <Zone x1={120} x2={300} y1={pbT} y2={pbB} color={bull?"#26a269":"#e03131"}/>
      <Lbl x={210} y={(pbT+pbB)/2+5} text="ZONA DE PULLBACK" bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[4]} y={bull?py(42,min,max):py(80,min,max)} text="↓ ENTRADA" bg="#78350f" fg="#fde68a" size={8}/>
      <Arrow x1={xs[5]} y1={bull?py(62,min,max):py(64,min,max)}
             x2={xs[5]} y2={bull?py(86,min,max):py(38,min,max)}
             color={bull?"#26a269":"#e03131"} id={`pb-${mode}`}/>
    </svg>
  );
}

function ChartRetest({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 18, max = 100;
  const candles: CD[] = bull ? [
    { o:38,h:50,l:34,c:46 }, { o:46,h:68,l:43,c:64 },
    { o:64,h:86,l:62,c:82 }, // breaks 68
    { o:82,h:90,l:76,c:84 }, { o:84,h:86,l:66,c:70 }, // retest
    { o:70,h:74,l:67,c:72 }, { o:72,h:92,l:69,c:89 }, { o:89,h:98,l:84,c:95 },
  ] : [
    { o:84,h:90,l:70,c:74 }, { o:74,h:76,l:56,c:60 },
    { o:60,h:62,l:38,c:42 }, // breaks 56
    { o:42,h:46,l:34,c:38 }, { o:38,h:60,l:36,c:56 }, // retest
    { o:56,h:58,l:53,c:54 }, { o:54,h:57,l:34,c:37 }, { o:37,h:40,l:24,c:26 },
  ];
  const xs = [42,94,150,210,272,332,396,460];
  const lvl = bull ? py(68,min,max) : py(56,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[30,52,70,88]} min={min} max={max}/>
      <DLine y={lvl} color={bull?"#26a269":"#e03131"}/>
      <Lbl x={38} y={lvl-8} text={bull?"RESISTENCIA ROTA → SOPORTE":"SOPORTE ROTO → RESISTENCIA"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8.5} anchor="start"/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <rect x={240} y={lvl-15} width={86} height={22} fill="#7c3aed" rx="4"/>
      <text x={283} y={lvl+2} textAnchor="middle" fill="#fff" fontSize={11} fontWeight="900">RETESTEO</text>
      <Arrow x1={xs[6]} y1={bull?py(72,min,max):py(54,min,max)}
             x2={xs[6]} y2={bull?py(90,min,max):py(34,min,max)}
             color={bull?"#26a269":"#e03131"} id={`ret-${mode}`}/>
    </svg>
  );
}

function ChartStopLoss({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 8, max = 106;
  const candles: CD[] = bull ? [
    { o:44,h:54,l:40,c:50 }, { o:50,h:62,l:46,c:58 },
    { o:58,h:68,l:52,c:64 }, // OB zone
    { o:64,h:74,l:60,c:70 }, { o:70,h:88,l:68,c:85 },
    { o:85,h:96,l:81,c:93 }, { o:93,h:100,l:88,c:97 }, { o:97,h:103,l:92,c:100 },
  ] : [
    { o:88,h:96,l:80,c:84 }, { o:84,h:86,l:70,c:73 },
    { o:73,h:80,l:64,c:68 }, // OB
    { o:68,h:71,l:54,c:56 }, { o:56,h:60,l:40,c:42 },
    { o:42,h:45,l:28,c:30 }, { o:30,h:33,l:18,c:20 }, { o:20,h:23,l:12,c:14 },
  ];
  const xs = [42,92,146,206,272,338,402,464];
  const entryY = bull ? py(68,min,max) : py(72,min,max);
  const stopY  = bull ? py(46,min,max) : py(88,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[22,44,65,85]} min={min} max={max}/>
      <DLine y={entryY} color="#facc15"/>
      <Lbl x={38} y={entryY-8} text="PRECIO DE ENTRADA" bg="#78350f" fg="#fde68a" size={8.5} anchor="start"/>
      <rect x={26} y={Math.min(entryY,stopY)} width={468} height={Math.abs(entryY-stopY)}
            fill="#e03131" opacity="0.08"/>
      <DLine y={stopY} color="#e03131"/>
      <Lbl x={38} y={stopY+(bull?16:-8)} text="STOP LOSS — INVALIDACIÓN" bg="#7f1d1d" fg="#fca5a5" size={8.5} anchor="start"/>
      <Lbl x={260} y={(entryY+stopY)/2+5} text="ZONA DE RIESGO (1R)" bg="#3f1515" fg="#fca5a5" size={9}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
    </svg>
  );
}

function ChartTakeProfit({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 18, max = 102;
  const candles: CD[] = bull ? [
    { o:34,h:44,l:30,c:40 }, { o:40,h:52,l:36,c:48 },
    { o:48,h:58,l:44,c:54 }, // entry
    { o:54,h:76,l:51,c:72 }, { o:72,h:86,l:68,c:82 },
    { o:82,h:94,l:78,c:91 }, // TP1
    { o:91,h:98,l:86,c:94 }, { o:94,h:102,l:90,c:99 }, // TP2
  ] : [
    { o:96,h:102,l:88,c:92 }, { o:92,h:94,l:78,c:82 },
    { o:82,h:85,l:72,c:76 }, // entry
    { o:76,h:78,l:58,c:61 }, { o:61,h:64,l:48,c:50 },
    { o:50,h:53,l:38,c:40 }, // TP1
    { o:40,h:43,l:30,c:32 }, { o:32,h:35,l:24,c:26 }, // TP2
  ];
  const xs = [42,92,146,204,264,328,392,456];
  const entryY = bull ? py(54,min,max) : py(82,min,max);
  const tp1Y   = bull ? py(88,min,max) : py(42,min,max);
  const tp2Y   = bull ? py(100,min,max): py(26,min,max);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[30,52,72,90]} min={min} max={max}/>
      <DLine y={entryY} color="#facc15"/>
      <Lbl x={38} y={entryY-8} text="ENTRADA" bg="#78350f" fg="#fde68a" size={8.5} anchor="start"/>
      <DLine y={tp1Y} color="#86efac"/>
      <Lbl x={38} y={tp1Y-8} text="TP1 — CERRAR PARCIAL (50%)" bg="#14532d" fg="#fff" size={8} anchor="start"/>
      <DLine y={tp2Y} color="#26a269"/>
      <Lbl x={38} y={tp2Y-8} text="TP2 — OBJETIVO FINAL" bg="#052e16" fg="#bbf7d0" size={8} anchor="start"/>
      <rect x={310} y={Math.min(entryY,tp1Y)} width={170} height={Math.abs(entryY-tp1Y)}
            fill="#26a269" opacity="0.07"/>
      <rect x={310} y={Math.min(tp1Y,tp2Y)} width={170} height={Math.abs(tp1Y-tp2Y)}
            fill="#26a269" opacity="0.14"/>
      <text x={396} y={(entryY+tp1Y)/2+5} textAnchor="middle" fill="#26a269" fontSize={12} fontWeight="900">1R</text>
      <text x={396} y={(tp1Y+tp2Y)/2+5} textAnchor="middle" fill="#16a34a" fontSize={12} fontWeight="900">2R</text>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
    </svg>
  );
}

function ChartRiskReward({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min = 8, max = 106;
  const candles: CD[] = bull ? [
    { o:38,h:50,l:34,c:46 }, { o:46,h:60,l:42,c:56 },
    { o:56,h:66,l:50,c:62 }, // entry
    { o:62,h:82,l:60,c:78 }, { o:78,h:92,l:74,c:88 },
    { o:88,h:100,l:84,c:97 }, { o:97,h:104,l:92,c:101 }, { o:101,h:105,l:96,c:103 },
  ] : [
    { o:94,h:100,l:84,c:88 }, { o:88,h:90,l:74,c:78 },
    { o:78,h:82,l:68,c:72 }, // entry
    { o:72,h:74,l:54,c:57 }, { o:57,h:60,l:44,c:46 },
    { o:46,h:48,l:32,c:34 }, { o:34,h:37,l:22,c:24 }, { o:24,h:27,l:14,c:16 },
  ];
  const xs = [42,90,144,202,264,328,392,456];
  const entryY = bull ? py(62,min,max) : py(76,min,max);
  const slY    = bull ? py(44,min,max) : py(88,min,max);
  const tp1Y   = bull ? py(84,min,max) : py(54,min,max);
  const tp2Y   = bull ? py(104,min,max): py(24,min,max);
  const risk   = Math.abs(entryY - slY);

  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[20,42,62,82,100]} min={min} max={max}/>
      <DLine y={slY}    color="#e03131"/>
      <DLine y={entryY} color="#facc15"/>
      <DLine y={tp1Y}   color="#86efac"/>
      <DLine y={tp2Y}   color="#26a269"/>
      <Lbl x={38} y={slY+(bull?14:-8)}  text="SL"     bg="#7f1d1d" fg="#fca5a5" size={8.5} anchor="start"/>
      <Lbl x={38} y={entryY-8}          text="ENTRY"  bg="#78350f" fg="#fde68a" size={8.5} anchor="start"/>
      <Lbl x={38} y={tp1Y-8}            text="TP1 1R" bg="#14532d" fg="#bbf7d0" size={8}   anchor="start"/>
      <Lbl x={38} y={tp2Y-8}            text="TP2 2R" bg="#052e16" fg="#86efac" size={8}   anchor="start"/>
      {/* risk bar */}
      <rect x={466} y={Math.min(entryY,slY)} width={16} height={risk} fill="#e03131" opacity="0.7" rx="2"/>
      <text x={488} y={(entryY+slY)/2+5} fill="#e03131" fontSize={10} fontWeight="900">1R</text>
      {/* reward bar */}
      <rect x={466} y={Math.min(entryY,tp2Y)} width={16} height={Math.abs(entryY-tp2Y)}
            fill="#26a269" opacity="0.35" rx="2"/>
      <text x={488} y={(entryY+tp2Y)/2+5} fill="#26a269" fontSize={10} fontWeight="900">2R</text>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
    </svg>
  );
}

function ChartRiskManagement({ mode }: { mode: "bullish"|"bearish" }) {
  const good = [100,102,100,105,108,106,112,116,114,122,118,128];
  const bad  = [100,112,88,118,74,105,60,88,40,72,26,55];
  const L=44,T=24,B=38,W=500,H=210;
  const maxV=132,minV=20;
  const scX=(i:number)=>L+(i/(good.length-1))*(W-L-20);
  const scY=(v:number)=>T+((maxV-v)/(maxV-minV))*(H-T-B);
  const gp=good.map((v,i)=>`${i===0?"M":"L"}${scX(i)},${scY(v)}`).join(" ");
  const bp=bad.map((v,i)=>`${i===0?"M":"L"}${scX(i)},${scY(v)}`).join(" ");
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      {[40,60,80,100,120].map(v=>(
        <g key={v}>
          <line x1={L} y1={scY(v)} x2={W} y2={scY(v)} stroke={GRID} strokeWidth="1"/>
          <text x={L-4} y={scY(v)+4} fill="#4a5568" fontSize={8} textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={L} y1={scY(100)} x2={W} y2={scY(100)} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4"/>
      <path d={bp} fill="none" stroke="#e03131" strokeWidth="2.5" opacity="0.8"/>
      {bad.map((v,i)=><circle key={i} cx={scX(i)} cy={scY(v)} r={4} fill={v>=100?"#e03131":"#7f1d1d"}/>)}
      <path d={gp} fill="none" stroke="#26a269" strokeWidth="3"/>
      {good.map((v,i)=><circle key={i} cx={scX(i)} cy={scY(v)} r={4} fill="#26a269"/>)}
      <Lbl x={scX(11)+14} y={scY(good[11])-6} text="✔ RIESGO FIJO 1%" bg="#14532d" fg="#fff" size={8.5} anchor="start"/>
      <Lbl x={scX(11)+14} y={scY(bad[11])+16} text="✘ SIN GESTIÓN"    bg="#7f1d1d" fg="#fff" size={8.5} anchor="start"/>
    </svg>
  );
}

function ChartSessions({ mode }: { mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const min=20,max=102;
  const candles: CD[] = [
    { o:55,h:60,l:51,c:57 }, { o:57,h:62,l:52,c:55 }, { o:55,h:60,l:50,c:57 },
    { o:57,h:63,l:bull?42:68,c:bull?46:64 }, // London sweep
    { o:bull?46:64,h:bull?70:66,l:bull?44:54,c:bull?67:58 },
    { o:bull?67:58,h:bull?86:60,l:bull?63:42,c:bull?83:45 },
    { o:bull?83:45,h:bull?95:47,l:bull?79:34,c:bull?92:37 },
    { o:bull?92:37,h:bull?100:39,l:bull?86:28,c:bull?98:31 },
  ];
  const xs=[52,98,144,216,272,342,400,460];
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <rect x={26}  y={18} width={162} height={214} fill="#3b82f6" opacity="0.04"/>
      <rect x={188} y={18} width={126} height={214} fill="#f59e0b" opacity="0.04"/>
      <rect x={314} y={18} width={200} height={214} fill="#26a269" opacity="0.04"/>
      <line x1={188} y1={18} x2={188} y2={232} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5"/>
      <line x1={314} y1={18} x2={314} y2={232} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.5"/>
      <Lbl x={107} y={34} text="🌏 ASIA"    bg="#1e3a8a" fg="#93c5fd" size={9}/>
      <Lbl x={251} y={34} text="🇬🇧 LONDON" bg="#78350f" fg="#fde68a" size={9}/>
      <Lbl x={414} y={34} text="🇺🇸 NY"     bg="#14532d" fg="#86efac" size={9}/>
      <Zone x1={28} x2={184} y1={py(62,min,max)} y2={py(50,min,max)} color="#3b82f6"/>
      <Lbl x={107} y={py(56,min,max)+5} text="RANGO ASIA" bg="#1e3a8a" fg="#93c5fd" size={8}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[3]} y={bull?py(38,min,max):py(72,min,max)} text={bull?"SWEEP ↓":"SWEEP ↑"} bg="#9a3412" fg="#fff" size={9}/>
      <Arrow x1={xs[5]} y1={bull?py(64,min,max):py(56,min,max)}
             x2={xs[5]} y2={bull?py(88,min,max):py(36,min,max)}
             color={bull?"#26a269":"#e03131"} id={`ses-${mode}`}/>
      <Lbl x={xs[6]+14} y={bull?py(90,min,max):py(34,min,max)}
           text={bull?"MOVIMIENTO NY ↑":"MOVIMIENTO NY ↓"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8} anchor="start"/>
    </svg>
  );
}

function ChartVolume({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=12,max=100;
  const candles: CD[]= bull ? [
    { o:44,h:52,l:40,c:48 }, { o:48,h:56,l:44,c:52 }, { o:52,h:60,l:48,c:56 }, { o:56,h:64,l:52,c:60 },
    { o:60,h:96,l:58,c:92 }, // high vol impulse
    { o:92,h:98,l:86,c:94 }, { o:94,h:100,l:88,c:97 }, { o:97,h:102,l:91,c:99 },
  ] : [
    { o:80,h:86,l:72,c:76 }, { o:76,h:80,l:66,c:70 }, { o:70,h:74,l:62,c:66 }, { o:66,h:69,l:58,c:62 },
    { o:62,h:64,l:30,c:34 }, // high vol drop
    { o:34,h:38,l:24,c:27 }, { o:27,h:30,l:18,c:21 }, { o:21,h:24,l:14,c:16 },
  ];
  const vols=[10,12,11,13,58,18,16,20];
  const xs=[48,96,144,194,252,314,374,436];
  const chartB=162, volMax=64;
  const scY=(p:number)=>py(p,min,max,22,chartB);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      {[30,50,70,88].map(p=><line key={p} x1={26} y1={scY(p)} x2={494} y2={scY(p)} stroke={GRID} strokeWidth="1"/>)}
      <line x1={26} y1={170} x2={494} y2={170} stroke={GRID} strokeWidth="1.5"/>
      {vols.map((v,i)=>{
        const barH=(v/volMax)*68;
        return <rect key={i} x={xs[i]-9} y={244-barH} width={18} height={barH}
          fill={v>30?(bull?"#26a269":"#e03131"):"#334155"} opacity="0.85" rx="1.5"/>;
      })}
      <text x={34} y={246} fill="#475569" fontSize={8} fontWeight="700">VOL</text>
      {candles.map((c,i)=>{
        const b=c.c>=c.o;
        const bT=Math.min(scY(c.o),scY(c.c)), bH=Math.max(3,Math.abs(scY(c.o)-scY(c.c)));
        return <g key={i}>
          <line x1={xs[i]} y1={scY(c.h)} x2={xs[i]} y2={scY(c.l)} stroke={b?BULL_WICK:BEAR_WICK} strokeWidth="1.8"/>
          <rect x={xs[i]-8} y={bT} width={16} height={bH} fill={b?BULL_BODY:BEAR_BODY} rx="1.5"/>
        </g>;
      })}
      <Lbl x={xs[4]} y={scY(bull?98:26)} text={bull?"VOLUMEN FUERTE ↑":"VOLUMEN FUERTE ↓"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8.5}/>
    </svg>
  );
}

function ChartManipulation({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=18,max=100;
  const candles: CD[]= bull ? [
    { o:66,h:73,l:58,c:62 }, { o:62,h:69,l:56,c:60 }, { o:60,h:67,l:54,c:63 },
    { o:63,h:65,l:40,c:48 }, // FAKE BREAK DOWN
    { o:48,h:84,l:46,c:80 }, // sharp reversal
    { o:80,h:92,l:76,c:89 }, { o:89,h:97,l:84,c:94 }, { o:94,h:100,l:89,c:97 },
  ] : [
    { o:50,h:57,l:44,c:53 }, { o:53,h:60,l:49,c:57 }, { o:57,h:63,l:52,c:60 },
    { o:60,h:84,l:58,c:80 }, // FAKE BREAK UP
    { o:80,h:82,l:48,c:52 }, // sharp reversal
    { o:52,h:55,l:38,c:41 }, { o:41,h:44,l:28,c:31 }, { o:31,h:34,l:20,c:22 },
  ];
  const xs=[42,92,142,200,264,330,394,458];
  const lvl    = bull?py(56,min,max):py(63,min,max);
  const fakeExt= bull?py(40,min,max):py(84,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[30,50,68,86]} min={min} max={max}/>
      <DLine y={lvl} color="#facc15"/>
      <Lbl x={38} y={lvl-8} text={bull?"NIVEL OBVIO (equal lows)":"NIVEL OBVIO (equal highs)"} bg="#78350f" fg="#fde68a" size={8.5} anchor="start"/>
      <Zone x1={170} x2={242} y1={Math.min(lvl,fakeExt)-4} y2={Math.max(lvl,fakeExt)+4} color="#e03131"/>
      <Lbl x={206} y={(lvl+fakeExt)/2+5} text="FAKE BREAK" bg="#7f1d1d" fg="#fca5a5" size={9}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[3]} y={bull?fakeExt-10:fakeExt+16} text={bull?"TRAMPA BAJISTA ↓":"TRAMPA ALCISTA ↑"} bg="#7f1d1d" fg="#fca5a5" size={8}/>
      <Arrow x1={xs[4]+8} y1={bull?py(50,min,max):py(76,min,max)}
             x2={xs[4]+8} y2={bull?py(84,min,max):py(44,min,max)}
             color={bull?"#26a269":"#e03131"} id={`manip-${mode}`}/>
      <Lbl x={xs[4]+22} y={bull?py(88,min,max):py(40,min,max)}
           text={bull?"GIRO VIOLENTO ↑":"GIRO VIOLENTO ↓"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8} anchor="start"/>
    </svg>
  );
}

function ChartSweep({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=18,max=100;
  const candles: CD[]= bull ? [
    { o:64,h:72,l:58,c:68 }, { o:68,h:74,l:57,c:62 }, { o:62,h:68,l:56,c:65 },
    { o:65,h:67,l:42,c:56 }, // SWEEP — long wick
    { o:56,h:80,l:54,c:77 }, { o:77,h:90,l:73,c:87 }, { o:87,h:97,l:82,c:94 }, { o:94,h:100,l:89,c:97 },
  ] : [
    { o:48,h:56,l:44,c:52 }, { o:52,h:60,l:48,c:56 }, { o:56,h:62,l:50,c:59 },
    { o:59,h:82,l:57,c:64 }, // SWEEP — long wick up
    { o:64,h:66,l:42,c:46 }, { o:46,h:49,l:32,c:35 }, { o:35,h:38,l:24,c:26 }, { o:26,h:29,l:18,c:20 },
  ];
  const xs=[42,90,140,198,262,326,390,454];
  const eqY    = bull?py(58,min,max):py(63,min,max);
  const sweepExt= bull?py(42,min,max):py(82,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,48,66,84]} min={min} max={max}/>
      <DLine y={eqY} color="#facc15"/>
      <Lbl x={38} y={eqY-8} text={bull?"EQUAL LOWS (stops aquí)":"EQUAL HIGHS (stops aquí)"} bg="#78350f" fg="#fde68a" size={8.5} anchor="start"/>
      <Zone x1={168} x2={242} y1={Math.min(eqY,sweepExt)-4} y2={Math.max(eqY,sweepExt)+4} color="#f97316"/>
      <Lbl x={205} y={(eqY+sweepExt)/2+5} text="SWEEP" bg="#9a3412" fg="#fff" size={10}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Arrow x1={xs[4]+8} y1={bull?py(60,min,max):py(62,min,max)}
             x2={xs[4]+8} y2={bull?py(84,min,max):py(38,min,max)}
             color={bull?"#26a269":"#e03131"} id={`sw-${mode}`}/>
      <Lbl x={xs[4]+22} y={bull?py(82,min,max):py(40,min,max)}
           text="GIRO TRAS SWEEP" bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8} anchor="start"/>
    </svg>
  );
}

function ChartInstitutional({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=18,max=100;
  const candles: CD[]= bull ? [
    { o:66,h:73,l:58,c:62 }, { o:62,h:68,l:56,c:60 },
    { o:60,h:62,l:40,c:46 }, // ① sweep
    { o:46,h:82,l:44,c:78 }, // ② CHoCH
    { o:78,h:80,l:58,c:62 }, // ③ retrace to FVG
    { o:62,h:67,l:59,c:65 }, // ④ FVG entry
    { o:65,h:90,l:62,c:87 }, // ⑤ impulse
    { o:87,h:98,l:83,c:95 },
  ] : [
    { o:52,h:59,l:46,c:56 }, { o:56,h:63,l:51,c:60 },
    { o:60,h:82,l:58,c:78 }, // ① sweep
    { o:78,h:80,l:46,c:50 }, // ② CHoCH
    { o:50,h:72,l:48,c:68 }, // ③ retrace to FVG
    { o:68,h:70,l:62,c:65 }, // ④ FVG entry
    { o:65,h:67,l:40,c:44 }, // ⑤ impulse
    { o:44,h:47,l:28,c:30 },
  ];
  const xs=[36,84,132,190,252,312,374,438];
  const fvgT=bull?py(78,min,max):py(72,min,max);
  const fvgB=bull?py(58,min,max):py(50,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[28,48,66,84]} min={min} max={max}/>
      <Zone x1={xs[4]-18} x2={xs[5]+18} y1={fvgT} y2={fvgB} color="#818cf8"/>
      <Lbl x={(xs[4]+xs[5])/2} y={(fvgT+fvgB)/2+5} text="④ FVG / OB" bg="#3730a3" fg="#c7d2fe" size={8.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[1]} y={bull?py(54,min,max):py(68,min,max)} text="① Liquidez" bg="#78350f" fg="#fde68a" size={7.5}/>
      <Lbl x={xs[2]} y={bull?py(36,min,max):py(86,min,max)} text="② Sweep"    bg="#9a3412" fg="#fff" size={7.5}/>
      <Lbl x={xs[3]} y={bull?py(86,min,max):py(42,min,max)} text="③ CHoCH"    bg="#5b21b6" fg="#ddd6fe" size={7.5}/>
      <Lbl x={xs[6]+16} y={bull?py(92,min,max):py(36,min,max)}
           text="⑤ ENTRADA" bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8} anchor="start"/>
      <Arrow x1={xs[6]} y1={bull?py(68,min,max):py(62,min,max)}
             x2={xs[6]} y2={bull?py(90,min,max):py(36,min,max)}
             color={bull?"#26a269":"#e03131"} id={`inst-${mode}`}/>
    </svg>
  );
}

function ChartConfirmation({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=8,max=102;
  const candles: CD[]= bull ? [
    { o:62,h:70,l:54,c:58 }, { o:58,h:64,l:46,c:52 }, // touches zone
    { o:52,h:56,l:44,c:50 }, // indecision
    { o:50,h:80,l:48,c:76 }, // ENGULFING CONFIRM
    { o:76,h:88,l:72,c:85 }, { o:85,h:96,l:80,c:93 }, { o:93,h:100,l:88,c:97 }, { o:97,h:102,l:92,c:99 },
  ] : [
    { o:48,h:56,l:42,c:52 }, { o:52,h:72,l:50,c:68 }, // touches zone
    { o:68,h:71,l:63,c:66 }, // indecision
    { o:66,h:68,l:42,c:46 }, // BEARISH ENGULFING
    { o:46,h:50,l:32,c:35 }, { o:35,h:38,l:22,c:25 }, { o:25,h:28,l:14,c:16 }, { o:16,h:19,l:10,c:12 },
  ];
  const xs=[42,94,150,214,278,342,406,468];
  const zT=bull?py(58,min,max):py(72,min,max);
  const zB=bull?py(44,min,max):py(62,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[20,42,62,82]} min={min} max={max}/>
      <Zone x1={26} x2={494} y1={zT} y2={zB} color={bull?"#26a269":"#e03131"}/>
      <Lbl x={260} y={zT-9} text={bull?"ZONA DE DEMANDA":"ZONA DE OFERTA"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={9.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <rect x={xs[3]-13} y={py(bull?80:68,min,max)-5} width={26}
            height={Math.abs(py(bull?48:44,min,max)-py(bull?80:68,min,max))+10}
            fill="none" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4 3" rx="3"/>
      <Lbl x={xs[3]} y={bull?py(86,min,max):py(36,min,max)} text="CONFIRMACIÓN" bg="#78350f" fg="#fde68a" size={8.5}/>
      <Arrow x1={xs[4]} y1={bull?py(70,min,max):py(56,min,max)}
             x2={xs[4]} y2={bull?py(90,min,max):py(28,min,max)}
             color={bull?"#26a269":"#e03131"} id={`conf-${mode}`}/>
    </svg>
  );
}

function ChartImpulse({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=10,max=102;
  const candles: CD[]= bull ? [
    { o:36,h:46,l:32,c:42 }, { o:42,h:52,l:38,c:48 }, { o:48,h:58,l:44,c:54 },
    { o:54,h:98,l:52,c:94 }, // IMPULSE
    { o:94,h:102,l:88,c:99 }, { o:99,h:102,l:92,c:96 }, { o:96,h:101,l:90,c:98 }, { o:98,h:102,l:93,c:100 },
  ] : [
    { o:92,h:100,l:84,c:88 }, { o:88,h:90,l:78,c:82 }, { o:82,h:84,l:72,c:76 },
    { o:76,h:78,l:34,c:38 }, // IMPULSE
    { o:38,h:42,l:28,c:32 }, { o:32,h:35,l:22,c:25 }, { o:25,h:28,l:16,c:19 }, { o:19,h:22,l:12,c:14 },
  ];
  const xs=[42,90,144,202,268,330,392,456];
  const fvgT=bull?py(94,min,max):py(58,min,max);
  const fvgB=bull?py(58,min,max):py(78,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[22,46,68,88]} min={min} max={max}/>
      <Zone x1={xs[3]-16} x2={xs[4]+16} y1={fvgT} y2={fvgB} color="#818cf8"/>
      <Lbl x={(xs[3]+xs[4])/2} y={(fvgT+fvgB)/2+5} text="FVG GENERADO" bg="#3730a3" fg="#c7d2fe" size={8.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[3]} y={bull?py(102,min,max):py(30,min,max)} text="IMPULSO" bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={11}/>
      <Arrow x1={xs[3]-18} y1={bull?py(56,min,max):py(80,min,max)}
             x2={xs[3]-18} y2={bull?py(96,min,max):py(40,min,max)}
             color={bull?"#26a269":"#e03131"} id={`imp-${mode}`}/>
    </svg>
  );
}

function ChartCorrection({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=12,max=100;
  const candles: CD[]= bull ? [
    { o:32,h:76,l:30,c:72 }, // impulse
    { o:72,h:74,l:60,c:63 }, { o:63,h:66,l:50,c:53 }, { o:53,h:58,l:46,c:54 }, // correction
    { o:54,h:86,l:52,c:82 }, // resume
    { o:82,h:94,l:78,c:91 }, { o:91,h:99,l:86,c:96 }, { o:96,h:102,l:91,c:99 },
  ] : [
    { o:94,h:96,l:52,c:56 }, // impulse
    { o:56,h:72,l:54,c:68 }, { o:68,h:78,l:62,c:74 }, { o:74,h:80,l:66,c:72 }, // correction
    { o:72,h:74,l:42,c:46 }, // resume
    { o:46,h:49,l:32,c:35 }, { o:35,h:38,l:22,c:25 }, { o:25,h:28,l:16,c:18 },
  ];
  const xs=[40,94,150,208,268,332,396,460];
  const cT=bull?py(74,min,max):py(80,min,max);
  const cB=bull?py(46,min,max):py(54,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[24,46,66,84]} min={min} max={max}/>
      <Zone x1={xs[1]-18} x2={xs[3]+18} y1={cT} y2={cB} color="#f59e0b"/>
      <Lbl x={(xs[1]+xs[3])/2} y={(cT+cB)/2+5} text="ZONA DE RETROCESO" bg="#78350f" fg="#fde68a" size={8.5}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[0]} y={bull?py(80,min,max):py(48,min,max)} text="Impulso" bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8}/>
      <Lbl x={xs[4]+16} y={bull?py(88,min,max):py(38,min,max)}
           text={bull?"Continúa ↑":"Continúa ↓"} bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8} anchor="start"/>
      <Arrow x1={xs[4]} y1={bull?py(60,min,max):py(68,min,max)}
             x2={xs[4]} y2={bull?py(86,min,max):py(38,min,max)}
             color={bull?"#26a269":"#e03131"} id={`corr-${mode}`}/>
    </svg>
  );
}

function ChartAccumulation({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const min=20,max=98;
  const candles: CD[]= bull ? [
    { o:80,h:86,l:64,c:68 }, { o:68,h:70,l:56,c:60 },
    { o:60,h:70,l:48,c:64 }, { o:64,h:72,l:50,c:54 },
    { o:54,h:56,l:40,c:44 }, // sweep below
    { o:44,h:70,l:42,c:66 }, // absorption
    { o:66,h:78,l:63,c:75 }, // breakout
    { o:75,h:96,l:72,c:93 }, // expansion
  ] : [
    { o:42,h:50,l:36,c:47 }, { o:47,h:60,l:44,c:56 },
    { o:56,h:70,l:50,c:64 }, { o:64,h:72,l:56,c:60 },
    { o:60,h:80,l:58,c:74 }, // sweep above
    { o:74,h:76,l:54,c:58 }, // distribution
    { o:58,h:60,l:44,c:47 }, // breakdown
    { o:47,h:50,l:30,c:33 }, // drop
  ];
  const xs=[36,84,134,188,248,312,374,438];
  const rT=py(72,min,max), rB=py(50,min,max);
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <Grid levels={[30,52,70,88]} min={min} max={max}/>
      <rect x={xs[2]-18} y={rT} width={xs[5]+18-(xs[2]-18)} height={rB-rT}
            fill={bull?"#26a269":"#e03131"} opacity="0.07"/>
      <DLine y={rT} x1={xs[2]-18} x2={xs[5]+18} color={bull?"#26a269":"#e03131"}/>
      <DLine y={rB} x1={xs[2]-18} x2={xs[5]+18} color={bull?"#26a269":"#e03131"}/>
      <Lbl x={(xs[2]+xs[5])/2} y={rT-9} text={bull?"ACUMULACIÓN":"DISTRIBUCIÓN"}
           bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={11}/>
      {candles.map((c,i)=><Candle key={i} x={xs[i]} c={c} min={min} max={max}/>)}
      <Lbl x={xs[4]} y={bull?py(36,min,max):py(84,min,max)}
           text={bull?"SWEEP ↓":"SWEEP ↑"} bg="#9a3412" fg="#fff" size={8.5}/>
      <Arrow x1={xs[7]} y1={bull?py(74,min,max):py(56,min,max)}
             x2={xs[7]} y2={bull?py(96,min,max):py(28,min,max)}
             color={bull?"#26a269":"#e03131"} id={`acc-${mode}`}/>
      <Lbl x={xs[7]+14} y={bull?py(90,min,max):py(32,min,max)}
           text={bull?"EXPANSIÓN ↑":"CAÍDA ↓"} bg={bull?"#14532d":"#7f1d1d"} fg="#fff" size={8} anchor="start"/>
    </svg>
  );
}

// Distribution is accumulation flipped
const ChartDistribution = ({ mode }: { mode: "bullish"|"bearish" }) =>
  <ChartAccumulation mode={mode==="bullish"?"bearish":"bullish"}/>;

function ChartPsychology({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const stages= bull ? [
    { label:"Esperanza", x:68,  y:148, c:"#86efac" },
    { label:"Optimismo", x:145, y:108, c:"#22c55e" },
    { label:"Euforia",   x:238, y:54,  c:"#facc15" },
    { label:"FOMO",      x:310, y:45,  c:"#f59e0b" },
    { label:"Negación",  x:374, y:88,  c:"#f97316" },
    { label:"Pánico",    x:436, y:170, c:"#e03131" },
  ] : [
    { label:"Euforia",    x:68,  y:64,  c:"#facc15" },
    { label:"Negación",   x:140, y:96,  c:"#f97316" },
    { label:"Miedo",      x:214, y:130, c:"#fb923c" },
    { label:"Pánico",     x:292, y:180, c:"#e03131" },
    { label:"Capitulac.", x:368, y:210, c:"#dc2626" },
    { label:"Depresión",  x:436, y:222, c:"#991b1b" },
  ];
  const path= bull
    ? "M55,152 C90,132 118,112 145,110 C182,90 210,68 238,56 C264,50 292,48 310,48 C330,54 350,74 374,96 C400,132 420,160 437,172"
    : "M55,68 C88,80 116,94 140,98 C166,106 192,122 214,135 C244,152 270,174 292,184 C316,196 344,208 368,214 C394,220 418,222 440,226";
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      {[60,100,140,180,220].map(y=><line key={y} x1={28} y1={y} x2={494} y2={y} stroke={GRID} strokeWidth="1"/>)}
      <path d={path} fill="none" stroke={bull?"#26a269":"#e03131"} strokeWidth="3.5"/>
      {stages.map((s,i)=><g key={i}>
        <circle cx={s.x} cy={s.y} r="7" fill={s.c}/>
        <Lbl x={s.x} y={s.y-13} text={s.label} bg={BG} fg={s.c} size={7.5}/>
      </g>)}
      <Lbl x={260} y={238}
           text={bull?"Comprar en miedo, no en euforia":"Vender en euforia, no en pánico"}
           bg="#3730a3" fg="#c7d2fe" size={9}/>
    </svg>
  );
}

function ChartJournal({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const months=["Ene","Feb","Mar","Abr","May","Jun"];
  const wr = bull?[38,42,46,50,55,61]:[62,55,50,46,43,40];
  const pnl= bull?[-8,2,7,15,22,32]:[18,10,3,-5,-13,-22];
  const scX=(i:number)=>66+i*80;
  const scWR=(v:number)=>185-((v-30)/40)*126;
  const scPnL=(v:number)=>185-((v+24)/58)*126;
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      {[60,100,140,185].map(y=><line key={y} x1={46} y1={y} x2={496} y2={y} stroke={GRID} strokeWidth="1"/>)}
      <line x1={46} y1={scPnL(0)} x2={496} y2={scPnL(0)} stroke="#475569" strokeWidth="1.5" strokeDasharray="5 4"/>
      {pnl.map((v,i)=>{
        const h=Math.abs(scPnL(0)-scPnL(v)), isPos=v>=0;
        return <rect key={i} x={scX(i)-13} y={isPos?scPnL(v):scPnL(0)} width={26} height={h}
          fill={isPos?BULL_BODY:BEAR_BODY} opacity="0.8" rx="2"/>;
      })}
      <polyline points={wr.map((v,i)=>`${scX(i)},${scWR(v)}`).join(" ")} fill="none" stroke="#818cf8" strokeWidth="2.5"/>
      {wr.map((v,i)=><circle key={i} cx={scX(i)} cy={scWR(v)} r={5} fill="#818cf8"/>)}
      {months.map((m,i)=><text key={i} x={scX(i)} y={204} fill="#64748b" fontSize={8.5} textAnchor="middle">{m}</text>)}
      <circle cx={68} cy={222} r={5} fill="#818cf8"/>
      <Lbl x={88} y={225} text="Win rate" bg={BG} fg="#818cf8" size={8} anchor="start"/>
      <rect x={158} y={216} width={16} height={10} fill={BULL_BODY} opacity="0.8" rx="1"/>
      <Lbl x={180} y={225} text="PnL" bg={BG} fg="#26a269" size={8} anchor="start"/>
      <Lbl x={350} y={225} text={bull?"Mejora con registro sistemático":"Sin registro = sin mejora"} bg="#3730a3" fg="#c7d2fe" size={7.5} anchor="start"/>
    </svg>
  );
}

function ChartPlan({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const boxes=[
    { x:194,y:26,  w:134,h:26, label:"¿Setup válido?",   color:"#818cf8" },
    { x:72, y:88,  w:118,h:26, label:"NO → Esperar",     color:"#e03131" },
    { x:330,y:88,  w:118,h:26, label:"SÍ → Verificar",   color:"#26a269" },
    { x:194,y:148, w:134,h:26, label:bull?"Definir SL/TP":"Calc. tamaño lote", color:"#facc15" },
    { x:194,y:208, w:134,h:26, label:bull?"EJECUTAR":"NO SIN PLAN", color:bull?"#26a269":"#e03131" },
  ];
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <defs>
        <marker id="plan-m" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#475569"/>
        </marker>
      </defs>
      <line x1={261} y1={52}  x2={131} y2={88}  stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-m)"/>
      <line x1={261} y1={52}  x2={389} y2={88}  stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-m)"/>
      <line x1={389} y1={114} x2={295} y2={148} stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-m)"/>
      <line x1={261} y1={174} x2={261} y2={208} stroke="#475569" strokeWidth="1.5" markerEnd="url(#plan-m)"/>
      {boxes.map((b,i)=><g key={i}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.color} opacity="0.12" rx="5"/>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={b.color} strokeWidth="1.5" rx="5" opacity="0.7"/>
        <text x={b.x+b.w/2} y={b.y+17} textAnchor="middle" fill={b.color} fontSize={9} fontWeight="800">{b.label}</text>
      </g>)}
    </svg>
  );
}

function ChartBacktesting({ mode }: { mode: "bullish"|"bearish" }) {
  const bull=mode==="bullish";
  const rows=[
    { n:1, dir:"L", setup:"FVG + BOS",      rr:"1:2",   res:bull?"WIN":"LOSS" },
    { n:2, dir:"L", setup:"OB + CHoCH",     rr:"1:2",   res:bull?"WIN":"LOSS" },
    { n:3, dir:"S", setup:"FVG + Sweep",    rr:"1:1.5", res:bull?"LOSS":"WIN" },
    { n:4, dir:"L", setup:"Sweep + OB",     rr:"1:3",   res:"WIN" },
    { n:5, dir:"S", setup:"CHoCH + FVG",    rr:"1:2",   res:bull?"LOSS":"WIN" },
    { n:6, dir:"L", setup:"BOS + Pullback", rr:"1:2",   res:bull?"WIN":"LOSS" },
  ];
  const wins=rows.filter(r=>r.res==="WIN").length;
  return (
    <svg viewBox="0 0 520 248" className="w-full h-full">
      <rect width="520" height="248" fill={BG} rx="6"/>
      <rect x={22} y={16} width={476} height={26} fill="#1e293b" rx="4"/>
      {["#","Dir","Setup","R:R","Resultado"].map((h,i)=>{
        const cx=[50,88,212,344,448][i];
        return <text key={i} x={cx} y={33} textAnchor="middle" fill="#64748b" fontSize={8.5} fontWeight="700">{h}</text>;
      })}
      {rows.map((r,i)=>{
        const ry=48+i*28, isW=r.res==="WIN";
        return <g key={i}>
          <rect x={22} y={ry} width={476} height={26} fill={i%2===0?"#0d1520":BG}/>
          <text x={50}  y={ry+16} textAnchor="middle" fill="#e2e8f0" fontSize={8.5}>{r.n}</text>
          <text x={88}  y={ry+16} textAnchor="middle" fill={r.dir==="L"?"#26a269":"#e03131"} fontSize={8.5} fontWeight="700">{r.dir}</text>
          <text x={212} y={ry+16} textAnchor="middle" fill="#cbd5e1" fontSize={8}>{r.setup}</text>
          <text x={344} y={ry+16} textAnchor="middle" fill="#818cf8" fontSize={8.5}>{r.rr}</text>
          <rect x={404} y={ry+6} width={88} height={14} fill={isW?"#14532d":"#7f1d1d"} opacity="0.3" rx="3"/>
          <text x={448} y={ry+16} textAnchor="middle" fill={isW?"#26a269":"#e03131"} fontSize={8.5} fontWeight="900">{r.res}</text>
        </g>;
      })}
      <rect x={22} y={220} width={476} height={24} fill="#1e293b" rx="4"/>
      <text x={120} y={236} textAnchor="middle" fill="#26a269"  fontSize={9} fontWeight="900">Win rate: {Math.round(wins/rows.length*100)}%</text>
      <text x={264} y={236} textAnchor="middle" fill="#818cf8"  fontSize={9} fontWeight="900">Trades: {rows.length}</text>
      <text x={420} y={236} textAnchor="middle" fill="#94a3b8"  fontSize={8}>W:{wins} / L:{rows.length-wins}</text>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
//  DISPATCHER MAP
// ═══════════════════════════════════════════════════════

const CHART_MAP: Record<ChartKind, React.FC<{ mode: "bullish"|"bearish" }>> = {
  liquidity: ChartLiquidity, fvg: ChartFVG, orderblock: ChartOrderBlock,
  bos: ChartBOS, choch: ChartCHoCH, support: ChartSupport, resistance: ChartResistance,
  uptrend: ChartUptrend, downtrend: ChartDowntrend, range: ChartRange,
  pullback: ChartPullback, retest: ChartRetest, stoploss: ChartStopLoss,
  takeprofit: ChartTakeProfit, riskreward: ChartRiskReward, riskmanagement: ChartRiskManagement,
  sessions: ChartSessions, volume: ChartVolume, manipulation: ChartManipulation,
  sweep: ChartSweep, institutional: ChartInstitutional, confirmation: ChartConfirmation,
  impulse: ChartImpulse, correction: ChartCorrection, accumulation: ChartAccumulation,
  distribution: ChartDistribution, psychology: ChartPsychology, journal: ChartJournal,
  plan: ChartPlan, backtesting: ChartBacktesting,
};

function ConceptChart({ concept, mode }: { concept: Concept; mode: "bullish"|"bearish" }) {
  const bull = mode === "bullish";
  const Chart = CHART_MAP[concept.chartKind];
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#050814] p-3 shadow-2xl">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-wide text-white flex items-center gap-2">
          {bull ? "EJEMPLO ALCISTA" : "EJEMPLO BAJISTA"}
          <span className="text-lg">{bull ? "↗" : "↘"}</span>
        </h3>
        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${
          bull ? "bg-emerald-500/15 text-emerald-300" : "bg-red-500/15 text-red-300"
        }`}>{bull ? "BUY SETUP" : "SELL SETUP"}</span>
      </div>
      <div className="overflow-hidden rounded-xl aspect-[2/1]">
        <Chart mode={mode}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════════════════

export default function ConceptosPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");

  const selected = concepts.find(c => c.id === selectedId) ?? concepts[0];
  const filtered = concepts.filter(c => {
    const q = query.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q);
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
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar concepto..."
            className="mb-4 w-full rounded-lg border border-slate-700 bg-[#080d19] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-violet-500"/>
          <div className="max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-2">
            {filtered.map(c=>(
              <button key={c.id} onClick={()=>setSelectedId(c.id)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-[14px] transition ${
                  selected.id===c.id
                    ?"bg-gradient-to-r from-violet-700 to-violet-600 text-white shadow-[0_0_18px_rgba(124,58,237,0.45)]"
                    :"text-slate-200 hover:bg-white/5 hover:text-white"
                }`}>
                <span>{c.id}. {c.title}</span>
                {selected.id===c.id && <span className="h-2 w-2 rounded-full bg-violet-200"/>}
              </button>
            ))}
          </div>
          <button onClick={()=>router.push("/dashboard")}
            className="mt-6 w-full rounded-lg border border-violet-500/50 bg-violet-950/30 px-4 py-3 font-semibold text-violet-300 transition hover:bg-violet-900/40">
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
            {selected.explanation.map((p,i)=><p key={i}>{p}</p>)}
          </div>
          <div className="my-8 border-t border-slate-800"/>
          <div className="rounded-xl border border-slate-700 bg-[#030711]/40 p-5">
            <h3 className="mb-4 text-xl font-black text-violet-300">Claves para identificar {selected.title.toLowerCase()}:</h3>
            <ul className="space-y-3 text-[16px] leading-7 text-slate-100">
              {selected.keys.map(k=>(
                <li key={k} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500"/>
                  <span>{k}</span>
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
          <ConceptChart concept={selected} mode="bullish"/>
          <ConceptChart concept={selected} mode="bearish"/>
        </section>

      </div>
    </main>
  );
}
