"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type ChartKind =
  | "liquidity" | "fvg" | "orderblock" | "bos" | "choch"
  | "support" | "resistance" | "uptrend" | "downtrend" | "range"
  | "pullback" | "retest" | "stoploss" | "takeprofit" | "riskreward"
  | "riskmanagement" | "sessions" | "volume" | "manipulation" | "sweep"
  | "institutional" | "confirmation" | "impulse" | "correction"
  | "accumulation" | "distribution" | "psychology" | "journal" | "plan" | "backtesting";

type Concept = {
  id: number; title: string; tag: string; subtitle: string; chartKind: ChartKind;
  explanation: string[]; keys: string[]; usage: string; summary: string;
};

const concepts: Concept[] = [
  { id:1,title:"Liquidez",tag:"Smart Money",subtitle:"Dónde se acumulan órdenes y stops antes del movimiento real.",chartKind:"liquidity",
    explanation:["La liquidez es el combustible que mueve el mercado. Es la acumulación de órdenes pendientes, stops de pérdida y órdenes de entrada que los traders minoristas colocan en zonas técnicas predecibles como máximos anteriores, mínimos anteriores y niveles psicológicos. Los grandes participantes necesitan enormes volúmenes de órdenes contrapuestas para ejecutar sus posiciones sin mover demasiado el precio.","El precio no se mueve al azar. Antes de cualquier movimiento significativo, suele buscar primero las zonas donde hay mayor concentración de órdenes. Las instituciones necesitan esa liquidez para llenar sus posiciones. Cuando el precio barre una zona de liquidez, activa esas órdenes y genera el volumen necesario para el movimiento real.","Las zonas de mayor liquidez se forman sobre máximos previos iguales (equal highs), debajo de mínimos previos iguales (equal lows), en niveles de soporte y resistencia muy visibles y en los extremos de rangos laterales.","La clave práctica no es entrar en la primera ruptura de un nivel, sino observar si el precio acepta el nuevo territorio o si solo realizó un barrido rápido para tomar los stops y luego girar."],
    keys:["Máximos o mínimos iguales acumulan stops de muchos traders.","Las instituciones necesitan liquidez para ejecutar posiciones grandes.","El barrido de liquidez precede al movimiento real en la dirección opuesta.","Cuanto más obvio el nivel, más liquidez y más probable el barrido.","Esperar confirmación de rechazo tras el barrido antes de entrar."],
    usage:"Marcá los equal highs y equal lows en tu gráfico. Cuando el precio los barra con una mecha larga y cierre contrario, buscá confirmación para entrar en la dirección opuesta al barrido.",
    summary:"La liquidez muestra dónde el mercado irá primero antes de moverse en serio. Identificar esas zonas te permite anticipar el movimiento real en lugar de ser atrapado por él." },
  { id:2,title:"FVG / Fair Value Gap",tag:"Smart Money",subtitle:"Desequilibrio de precio que funciona como zona de retorno y reacción.",chartKind:"fvg",
    explanation:["Un Fair Value Gap es una ineficiencia que aparece cuando el precio se desplaza con tanta fuerza que deja una zona sin negociar entre tres velas consecutivas. En un FVG alcista, el mínimo de la tercera vela está por encima del máximo de la primera.","Este desequilibrio representa una zona donde compradores y vendedores no llegaron a negociar. El mercado tiende a volver a esas zonas para llenar el gap, permitiendo que los participantes que quedaron fuera del movimiento inicial puedan entrar a un precio razonable.","El FVG es más confiable en contexto estructural claro: después de un barrido de liquidez, después de un CHoCH o como parte de un desplazamiento impulsivo post-BOS.","En la práctica se usa como zona de entrada: cuando el precio regresa al FVG, se busca una vela de confirmación para entrar en la dirección del impulso original."],
    keys:["Zona vacía entre tres velas consecutivas tras un movimiento fuerte.","Representa desequilibrio entre oferta y demanda.","El precio tiende a regresar a esa zona antes de continuar.","Más válido cuando sigue a una ruptura de estructura o barrido.","Stop ajustado al extremo del gap."],
    usage:"Marcá el gap entre vela 1 y vela 3 del movimiento impulsivo. Esperá que el precio regrese, observá la reacción y buscá confirmación antes de entrar.",
    summary:"El FVG representa un desequilibrio que el mercado tiende a corregir. Cuando el precio retorna con confirmación, ofrece una entrada de alta probabilidad en la dirección del impulso." },
  { id:3,title:"Order Block",tag:"Smart Money",subtitle:"Zona institucional donde grandes players ejecutaron órdenes masivas.",chartKind:"orderblock",
    explanation:["Un Order Block es la última vela de dirección contraria antes de un movimiento impulsivo fuerte. Representa la zona donde las instituciones ejecutaron sus órdenes masivas, dejando una huella en el gráfico.","Las instituciones no pueden ejecutar todas sus órdenes de una sola vez. Por eso, cuando el precio regresa a esa zona, hay órdenes pendientes que se activan, generando una reacción.","Para que un OB sea válido, debe generar un desplazamiento fuerte e impulsivo inmediatamente después y haber dejado un FVG o ruptura de estructura.","La entrada se realiza cuando el precio regresa al OB y muestra señales de rechazo."],
    keys:["Última vela contraria antes de un desplazamiento fuerte e impulsivo.","Zona donde las instituciones ejecutaron posiciones masivas.","Debe generar BOS o FVG inmediatamente después para ser válido.","El precio tiende a regresar a esa zona y reaccionar.","Stop debajo del OB completo."],
    usage:"Identificá la última vela bajista antes de una subida impulsiva. Cuando el precio regrese, esperá vela de rechazo para entrar con stop bajo el OB.",
    summary:"El order block marca una zona institucional de alta probabilidad de reacción. Cuando el precio la revisita, las órdenes pendientes generan el rechazo que buscamos." },
  { id:4,title:"Break of Structure (BOS)",tag:"Estructura",subtitle:"Ruptura confirmada de un máximo o mínimo estructural relevante.",chartKind:"bos",
    explanation:["El BOS ocurre cuando el precio rompe de manera decisiva un máximo o mínimo estructural relevante, confirmando la intención y dirección del mercado.","En tendencia alcista saludable, los BOS al alza se producen consecutivamente. En bajista, los BOS a la baja confirman el dominio vendedor.","El BOS requiere cierre de vela más allá del nivel. Una mecha sin cierre puede ser manipulación o sweep, no necesariamente un BOS válido.","El BOS no se opera directamente. Lo profesional es usarlo para confirmar la dirección y esperar retroceso a zona de valor."],
    keys:["Ruptura de máximo previo (alcista) o mínimo previo (bajista) con cierre.","Confirma la dirección e intención del mercado.","Requiere cierre de vela más allá del nivel, no solo mecha.","No se opera directamente; se usa para definir sesgo direccional.","Esperar retroceso a zona de valor para entrar con mejor precio."],
    usage:"Usá el BOS para confirmar tu sesgo. Una vez que ocurre, esperá el retroceso a FVG u OB más cercano para buscar entrada en la misma dirección.",
    summary:"El BOS confirma que la estructura fue rota y establece la dirección dominante del mercado. Es la base para definir el sesgo de trading." },
  { id:5,title:"Change of Character (CHoCH)",tag:"Estructura",subtitle:"Primera señal de posible reversión o cambio de control del mercado.",chartKind:"choch",
    explanation:["El CHoCH es la primera señal de que el control del mercado puede estar transfiriéndose. Aparece cuando en una tendencia bajista el precio rompe por primera vez hacia arriba el último Lower High.","Es especialmente poderoso cuando aparece después de un barrido de liquidez: tendencia → barrido → CHoCH → movimiento contrario.","El CHoCH es señal temprana, no garantía. En rangos laterales puede fallar. Requiere confirmación adicional.","La diferencia clave: CHoCH indica reversión posible; BOS confirma continuación."],
    keys:["Primera ruptura contraria a la tendencia dominante en microestructura.","Señala posible transferencia de control.","Más válido cuando sigue a un barrido de liquidez.","Es señal temprana; requiere confirmación adicional.","Diferente al BOS: indica reversión, no continuación."],
    usage:"Buscá CHoCH después de un barrido claro. Una vez que ocurre, esperá retroceso a FVG u OB para entrar en la nueva dirección.",
    summary:"El CHoCH es el primer aviso de cambio de dirección. Combinado con un barrido previo, es el inicio de la secuencia institucional de alta probabilidad." },
  { id:6,title:"Soporte",tag:"Análisis técnico",subtitle:"Zona de demanda donde el precio históricamente encuentra compradores.",chartKind:"support",
    explanation:["El soporte es una zona donde el precio ha encontrado demanda suficiente para detener una caída y generar un rebote. No es una línea exacta sino un área de precios.","Cada rebote crea un recuerdo colectivo en el mercado. Los traders que compraron ahí antes quieren repetirlo, creando una zona de demanda autoreforzada.","Un soporte se fortalece con múltiples confluencias: FVG, order blocks, niveles de liquidez. Pero cada toque lo debilita un poco.","No se opera simplemente porque el precio tocó soporte. Se espera confirmación de reacción."],
    keys:["Zona de demanda donde el precio ha rebotado en el pasado.","Es un área, no una línea exacta.","Se fortalece con múltiples confluencias.","Cada toque lo debilita; muchos toques aumentan la probabilidad de ruptura.","Esperar confirmación de reacción antes de comprar."],
    usage:"Marcá la zona de soporte como un área. Esperá que el precio llegue ahí y buscá una vela de reversión alcista o mecha larga de rechazo antes de entrar.",
    summary:"El soporte es una zona donde la demanda histórica supera la oferta. Su poder real está en la confluencia con otros conceptos institucionales." },
  { id:7,title:"Resistencia",tag:"Análisis técnico",subtitle:"Zona de oferta donde el precio históricamente encuentra vendedores.",chartKind:"resistance",
    explanation:["La resistencia es una zona donde el precio ha encontrado suficiente presión vendedora para detener una subida. Los traders atrapados en pérdidas esperan el regreso del precio para salir.","Una de sus propiedades más importantes: la resistencia rota con fuerza se convierte en soporte. El precio cambia el rol del nivel.","El retesteo de una resistencia rota como soporte es uno de los setups más clásicos y fiables del análisis técnico.","La entrada se realiza cuando el precio regresa al nivel y muestra señales de confirmación."],
    keys:["Zona de oferta donde el precio ha encontrado vendedores repetidamente.","Psicología de manos atrapadas: vendedores esperan el regreso.","La resistencia rota se convierte en soporte (rol swap).","El retesteo de resistencia rota como soporte es un setup clásico.","Confirmar ruptura con cierre de vela, no solo mecha."],
    usage:"Cuando el precio rompe una resistencia con cierre fuerte, marcá esa zona como futuro soporte. Esperá el retesteo y buscá vela de confirmación alcista.",
    summary:"La resistencia marca donde la oferta histórica frena el precio. Su ruptura confirmada y el retesteo como soporte generan uno de los setups de mayor probabilidad." },
  { id:8,title:"Tendencia alcista",tag:"Estructura",subtitle:"Secuencia de máximos y mínimos crecientes que define el control comprador.",chartKind:"uptrend",
    explanation:["Una tendencia alcista se define por Higher Highs (HH) y Higher Lows (HL) consecutivos. Cada impulso supera el máximo anterior y cada retroceso se detiene más arriba.","Un trader profesional alinea su dirección con la tendencia del timeframe mayor para aumentar la probabilidad de sus operaciones.","Los retrocesos a los Higher Lows son las oportunidades de entrada de mayor calidad. No se compra en el impulso sino en el retroceso a zona de valor.","La tendencia se invalida cuando el precio rompe el último Higher Low de manera decisiva."],
    keys:["Definida por Higher Highs (HH) y Higher Lows (HL) consecutivos.","Los retrocesos a HL son las mejores oportunidades de compra.","Alinear con tendencia del timeframe mayor.","Se invalida con la ruptura decisiva del último Higher Low.","No comprar en el impulso; esperar el retroceso a zona de valor."],
    usage:"En tendencia alcista confirmada, esperá el retroceso a zona de demanda que coincida con el área del último HL. Buscá confirmación y comprá con stop bajo esa zona.",
    summary:"La tendencia alcista define el control comprador. Comprar los retrocesos a Higher Lows es la estrategia de mayor probabilidad en mercados direccionales." },
  { id:9,title:"Tendencia bajista",tag:"Estructura",subtitle:"Secuencia de máximos y mínimos decrecientes que define el control vendedor.",chartKind:"downtrend",
    explanation:["La tendencia bajista se define por Lower Highs (LH) y Lower Lows (LL) consecutivos. Los vendedores tienen el control: cada impulso crea un nuevo mínimo y cada rebote se frena más abajo.","Requiere disciplina para no intentar comprar barato contra la tendencia dominante. El mercado puede caer más de lo que parece razonable.","Los rebotes a los Lower Highs son las zonas de venta de mayor calidad, especialmente cuando coinciden con zonas de oferta institucional.","La tendencia se invalida cuando el precio rompe el último Lower High con cierre de vela."],
    keys:["Definida por Lower Highs (LH) y Lower Lows (LL) consecutivos.","Los rebotes a LH son las mejores oportunidades de venta.","Requiere disciplina para no comprar contra la tendencia.","Se invalida con ruptura decisiva del último Lower High.","No vender en el impulso; esperar el rebote a zona de oferta."],
    usage:"En tendencia bajista confirmada, esperá que el precio rebote a zona de oferta que coincida con el área del LH esperado. Buscá confirmación bajista y vendé.",
    summary:"La tendencia bajista define el control vendedor. Vender los rebotes a Lower Highs es la estrategia de mayor probabilidad en mercados bajistas." },
  { id:10,title:"Rango lateral",tag:"Contexto",subtitle:"Precio consolidado entre soporte y resistencia sin dirección definida.",chartKind:"range",
    explanation:["Un rango ocurre cuando el precio se mueve horizontalmente entre soporte (piso) y resistencia (techo). El mercado pasa entre 60-70% del tiempo en consolidaciones.","La estructura interna tiene tres zonas: techo (oferta), piso (demanda) y centro (equilibrio de baja ventaja).","Las mejores oportunidades son en los extremos: compras en el piso y ventas en el techo, siempre con confirmación. El centro tiene muy mal R:R.","El rango termina con ruptura genuina que suele preceder movimientos grandes."],
    keys:["Precio oscila entre soporte y resistencia sin dirección.","El centro del rango tiene la peor relación riesgo-beneficio.","Los extremos son las mejores zonas de operación.","Los barridos falsos de los extremos son frecuentes.","La ruptura con retesteo confirma el nuevo movimiento direccional."],
    usage:"Operá solo los extremos con confirmación. En el piso, buscá rebote alcista. En el techo, buscá rechazo bajista. Evitá el centro.",
    summary:"El rango requiere paciencia y operar solo los extremos. Los barridos falsos son parte del juego, y la ruptura con retesteo define el próximo movimiento." },
  { id:11,title:"Pullback",tag:"Entrada",subtitle:"Retroceso temporal dentro de una tendencia que ofrece entrada con mejor precio.",chartKind:"pullback",
    explanation:["El pullback es un retroceso temporal contra la tendencia principal que da al precio la oportunidad de respirar y al trader de entrar a mejor precio.","Un pullback sano respeta la estructura: no rompe el último HL en alcista ni el último LH en bajista. Si lo viola, puede ser reversión.","Los mejores pullbacks llegan a una confluencia de zonas de valor: FVG, OB, soporte previo o nivel de retroceso significativo.","No se opera simplemente porque llegó a la zona. Se espera confirmación: vela de reversión o ruptura de microestructura."],
    keys:["Retroceso temporal contra la tendencia principal, no una reversión.","Debe respetar la estructura: no romper el HL (alcista) o LH (bajista).","Mayor probabilidad cuando llega a confluencia de zonas de valor.","Esperar confirmación de reacción antes de entrar.","Permite entrar con mejor precio y stop más ajustado."],
    usage:"Identificá la tendencia y marcá zonas de valor. Cuando el precio retroceda, esperá confirmación (engulfing, pin bar) para entrar.",
    summary:"El pullback es la oportunidad de entrar en tendencia con precio favorable. Su calidad depende de la confluencia y la confirmación." },
  { id:12,title:"Retesteo",tag:"Entrada",subtitle:"El precio regresa a probar un nivel roto para confirmar el cambio de rol.",chartKind:"retest",
    explanation:["El retesteo ocurre cuando el precio, tras romper un nivel significativo, regresa a ese nivel para probarlo desde el otro lado. Combina confirmación de ruptura con entrada de bajo riesgo.","La lógica psicológica: traders que se perdieron la ruptura esperan el regreso, los que vendieron corto cubren pérdidas, las instituciones usan el nivel como soporte.","Los mejores retesteos coinciden con FVG dejado por el impulso de ruptura, OB, o nivel de estructura mayor.","La entrada se hace cuando el precio muestra confirmación en el nivel."],
    keys:["El precio regresa a probar el nivel roto desde el otro lado.","Resistencia rota → soporte. Soporte roto → resistencia.","Compradores y vendedores atrapados reaccionan en el nivel.","Más fiable cuando coincide con FVG, OB u otras confluencias.","Entrada con confirmación; stop al otro lado del nivel."],
    usage:"Esperá que el precio rompa un nivel clave. Cuando regrese a probarlo, buscá confirmación de reacción para entrar con stop ajustado.",
    summary:"El retesteo confirma que una ruptura fue genuina y ofrece la entrada más segura. Es donde la relación riesgo-beneficio suele ser más favorable." },
  { id:13,title:"Stop Loss",tag:"Riesgo",subtitle:"El nivel donde la idea queda invalidada y la pérdida se limita.",chartKind:"stoploss",
    explanation:["El stop loss es la herramienta más importante de gestión de riesgo. Limita la pérdida si el precio alcanza un nivel determinado. Es una declaración de intención: si el precio llega aquí, mi idea estaba equivocada.","La ubicación debe ser técnica: en el nivel donde la hipótesis de trading queda claramente invalidada.","El error más común es mover el stop en contra para evitar ser salido. Esto convierte una pérdida pequeña en una grande.","El tamaño de posición se calcula según la distancia al stop: si está lejos, el lote es menor; si está cerca, puede ser mayor."],
    keys:["Orden automática que limita la pérdida si el precio alcanza el nivel.","Debe colocarse donde la hipótesis de trading queda invalidada.","Se define ANTES de entrar, basado en análisis técnico.","Nunca mover el stop en contra; solo a favor (trailing).","El tamaño de posición se calcula según la distancia al stop."],
    usage:"Antes de entrar, identificá el nivel de invalidación. Colocá el stop ahí. Calculá el lote para que la pérdida represente tu riesgo máximo (ej: 1%).",
    summary:"El stop loss mantiene viva la cuenta. Su ubicación técnica y el respeto a su nivel son la diferencia entre trading profesional y juego de azar." },
  { id:14,title:"Take Profit",tag:"Riesgo",subtitle:"Zona de salida planificada donde se materializan las ganancias.",chartKind:"takeprofit",
    explanation:["El take profit es la orden de cierre en un nivel predefinido de ganancia. Debe planificarse antes de abrir la operación, no improvisarse cuando el precio ya se mueve.","La ubicación debe ser técnica: en el siguiente nivel de liquidez, resistencia (en compras) o soporte (en ventas) relevante.","El TP parcial: cerrar el 50-70% en el primer objetivo (TP1) y dejar correr el resto. Cuando TP1 se alcanza, mover el stop a break even.","El trailing stop permite proteger ganancias sin cerrar prematuramente en tendencias fuertes."],
    keys:["Orden de cierre en nivel predefinido; planificada antes de entrar.","Se ubica en el siguiente nivel técnico relevante.","El TP parcial combina seguridad y captura de movimientos mayores.","Mover stop a break even cuando TP1 es alcanzado.","No inventar objetivos arbitrarios; deben tener justificación técnica."],
    usage:"Antes de entrar, identificá el primer objetivo técnico como TP1. Calculá si el R:R es al menos 1:1.5. Definí un TP2 si la estructura lo justifica.",
    summary:"El take profit planificado convierte el análisis en ganancia real. Su ubicación técnica define la calidad del setup." },
  { id:15,title:"Relación Riesgo Beneficio",tag:"Riesgo",subtitle:"La proporción entre lo que arriesgás y lo que potencialmente ganás.",chartKind:"riskreward",
    explanation:["El R:R compara la pérdida potencial contra la ganancia potencial. Un R:R de 1:2 significa que por cada unidad arriesgada buscás ganar dos.","La matemática es contraintuitiva: con R:R 1:2 solo necesitás acertar el 34% de las operaciones para no perder. Con 1:3, el 25%.","El R:R debe surgir del análisis técnico: stop en el nivel de invalidación, TP en el siguiente nivel relevante.","No manipular el stop u objetivo para forzar un buen R:R en papel."],
    keys:["Compara pérdida potencial vs ganancia potencial.","Con R:R 1:2 solo necesitás acertar el 34% para ser rentable.","Surge del análisis técnico; no se elige arbitrariamente.","Mínimo recomendado: 1:1.5.","No manipular stop u objetivo para forzar un buen R:R."],
    usage:"Una vez definidos stop y TP, calculá el R:R. Si es menor a 1:1.5, esperá un setup de mejor calidad.",
    summary:"El R:R es el motor de la rentabilidad a largo plazo. Con buena relación, podés ser rentable acertando menos de la mitad de las operaciones." },
  { id:16,title:"Gestión de riesgo",tag:"Riesgo",subtitle:"El sistema de reglas que protege el capital y garantiza la supervivencia.",chartKind:"riskmanagement",
    explanation:["La gestión de riesgo determina cuánto capital se arriesga en cada operación y cómo se preserva el capital. Es el aspecto más importante del trading a largo plazo.","El principio fundamental: no arriesgar más del 0.5-2% del capital por operación. Con 1% necesitarías 100 pérdidas consecutivas para perder todo.","Incluye límites diarios: un límite del 3-5% evita los días catástrofe por sobre-operar en pérdida o trading de revancha.","El sizing de posición se calcula: lote = (capital × % riesgo) ÷ (distancia en puntos al stop × valor del punto)."],
    keys:["Arriesgar entre 0.5% y 2% del capital por operación.","Calcular el tamaño de lote según la distancia al stop.","Establecer límite de pérdida diaria (3-5%).","Nunca operar por revancha después de una pérdida.","La consistencia en las reglas vale más que acertar entradas."],
    usage:"Definí tu riesgo por operación (ej: 1%). Para cada trade: lote = (capital × 1%) ÷ (distancia al stop × valor del punto).",
    summary:"La gestión de riesgo separa al trader que sobrevive del que quema su cuenta. Las reglas de riesgo fijo son el sistema inmune de la cuenta." },
  { id:17,title:"Sesiones de mercado",tag:"Contexto",subtitle:"Los horarios donde cambia radicalmente la actividad, liquidez y volatilidad.",chartKind:"sessions",
    explanation:["El mercado opera 24hs pero no todos los horarios tienen la misma actividad. Las tres sesiones principales son Asia, Londres y Nueva York, cada una con características distintas.","La sesión asiática (00-09 GMT) tiene baja volatilidad y consolida el movimiento anterior, formando el rango que usarán las próximas sesiones como liquidez.","La sesión de Londres (07-16 GMT) es la de mayor volumen. Frecuentemente barre la liquidez asiática y establece la dirección del día.","La sesión de Nueva York (13-22 GMT) confirma o revierte a Londres. El overlap 13-16 GMT es el más volátil."],
    keys:["Asia: baja volatilidad, formación de rango y liquidez.","Londres: mayor volumen global, barre la liquidez asiática y establece dirección.","NY: confirma o revierte a Londres; overlap 13-16 GMT es el más volátil.","El rango asiático crea las zonas de liquidez que buscan las sesiones siguientes.","Alinear operaciones con la sesión de mayor relevancia."],
    usage:"Marcá los máximos y mínimos del rango asiático. Observá si Londres los barre y en qué dirección. Usá eso como sesgo para buscar setups en NY.",
    summary:"Las sesiones crean el ciclo diario: Asia consolida, Londres activa y NY confirma. Entender este ritmo permite anticipar barridos y alinearse con el flujo institucional." },
  { id:18,title:"Volumen",tag:"Confirmación",subtitle:"La cantidad de actividad detrás de cada movimiento del precio.",chartKind:"volume",
    explanation:["El volumen representa la cantidad de contratos negociados en un período. Mientras el precio dice qué pasa, el volumen dice cuánta convicción hay detrás.","En un impulso genuino el volumen debe aumentar durante el movimiento y disminuir durante los retrocesos.","La divergencia precio-volumen es especialmente útil: nuevos máximos con menor volumen señalan posible agotamiento.","Volumen alto en zonas específicas puede indicar participación institucional: absorción en soporte o distribución en resistencia."],
    keys:["Impulsos con volumen alto son más confiables.","Retrocesos con volumen bajo confirman que son temporales.","Divergencia precio-volumen puede señalar agotamiento.","Volumen alto en soportes puede indicar absorción institucional.","Comparar volumen del impulso vs retroceso para evaluar la tendencia."],
    usage:"Verificá que los impulsos en tu dirección tengan mayor volumen que los retrocesos. Desconfiá de rupturas con volumen muy bajo.",
    summary:"El volumen es el detector de convicción. Un movimiento respaldado por volumen creciente es más confiable, especialmente en rupturas de niveles clave." },
  { id:19,title:"Manipulación",tag:"Smart Money",subtitle:"Movimiento diseñado para atrapar traders antes del giro real.",chartKind:"manipulation",
    explanation:["La manipulación es la consecuencia natural de cómo los grandes participantes necesitan liquidez. Cuando hay stops en un nivel obvio, el precio va allí, los activa y usa esa liquidez para ir en dirección contraria.","El patrón más común es el fake breakout: el precio rompe un nivel técnico obvio, activa stops y entradas, y luego revierte violentamente.","Se identifica por mechas largas que rechazan el nuevo nivel, o movimientos rápidos que revierten sin consolidación.","La defensa es la paciencia: no operar en el primer toque ni en la primera ruptura."],
    keys:["El precio va a zonas obvias de stops para tomar esa liquidez.","El fake breakout: rompe el nivel, atrapa traders y revierte con fuerza.","Se identifica por mechas largas que rechazan el nuevo nivel.","Ocurre más en niveles técnicos muy obvios y visibles.","Defensa: esperar aceptación del nuevo nivel antes de operar."],
    usage:"Cuando el precio rompe un nivel muy obvio, no entres inmediatamente. Esperá que demuestre aceptación. Si revierte rápido, fue manipulación.",
    summary:"La manipulación es la herramienta para obtener liquidez barata. Reconocerla te protege y te permite usar el barrido como oportunidad." },
  { id:20,title:"Barrido de liquidez",tag:"Smart Money",subtitle:"Ruptura breve de un nivel para tomar stops y generar el movimiento real.",chartKind:"sweep",
    explanation:["El barrido ocurre cuando el precio rompe brevemente un nivel técnico, activa los stops y luego revierte rápidamente. El precio no acepta el nuevo nivel, solo va a recoger las órdenes.","Visualmente es una mecha larga: en un barrido de mínimos, el precio cae bajo los equal lows, activa los stops y cierra de vuelta por encima.","Los barridos suelen preceder directamente al movimiento real en la dirección contraria. La secuencia: liquidez → sweep → CHoCH → entrada.","Para operar el barrido, se espera que ocurra y luego se busca confirmación de cambio de dirección."],
    keys:["Ruptura breve seguida de reversión rápida; visible como mecha larga.","Activa stops y órdenes acumuladas en el nivel barrido.","Precede al movimiento real en la dirección contraria.","La secuencia completa: liquidez → sweep → CHoCH → entrada.","Stop bajo el extremo de la mecha del barrido."],
    usage:"Identificá equal highs o lows con stops acumulados. Cuando el precio los barra con mecha larga, buscá CHoCH o confirmación para entrar en sentido contrario.",
    summary:"El barrido es la firma institucional antes del movimiento real. Reconocerlo permite entrar justo cuando la mayoría acaba de ser sacada del mercado." },
  { id:21,title:"Entrada institucional",tag:"Smart Money",subtitle:"El setup completo que combina liquidez, estructura y zona para alta probabilidad.",chartKind:"institutional",
    explanation:["La entrada institucional es una secuencia lógica de eventos: liquidez visible → sweep → CHoCH → retroceso a FVG/OB → confirmación → entrada.","Cada elemento tiene su función: la liquidez tomada genera el combustible, el CHoCH confirma el cambio de control, el retroceso al FVG/OB da el mejor precio.","Si alguno de estos elementos falta, la probabilidad del setup disminuye significativamente.","La paciencia es el ingrediente invisible: esperar el retroceso a la zona de valor, no entrar en el CHoCH."],
    keys:["Secuencia: liquidez → sweep → CHoCH → retroceso a FVG/OB → entrada.","Cada elemento tiene su función; si falta uno, baja la probabilidad.","No entrar en el CHoCH; esperar el retroceso a la zona de valor.","Buscar confirmación en la zona de valor antes de ejecutar.","Stop bajo el extremo del sweep; objetivo en la siguiente zona de liquidez."],
    usage:"Esperá la secuencia completa: liquidez acumulada, sweep, CHoCH, retroceso a FVG u OB, confirmación en esa zona, y entrá con stop bajo el sweep.",
    summary:"La entrada institucional es el setup de mayor probabilidad porque combina múltiples confluencias. Requiere paciencia pero ofrece la mejor relación riesgo-beneficio." },
  { id:22,title:"Confirmación",tag:"Entrada",subtitle:"La señal final que reduce la incertidumbre y justifica la ejecución.",chartKind:"confirmation",
    explanation:["La confirmación es la señal que finalmente justifica la ejecución: una vela de acción del precio, ruptura de microestructura, o indicador que converja con el análisis.","Sin confirmación, operar porque tocó la zona es como atrapar cuchillos. La zona puede ser válida pero el precio puede seguir en tu contra.","Los tipos más comunes: vela engulfing (engulle el cuerpo anterior), pin bar (mecha larga, cuerpo pequeño), CHoCH mini en timeframe menor.","La calidad importa: confirmación en H4 o diario pesa más que en M5."],
    keys:["La señal final que justifica ejecutar en la zona de interés.","Evita entrar sin ver reacción del precio.","Tipos comunes: engulfing, pin bar, ruptura de microestructura.","La confirmación en timeframe mayor tiene más peso.","No todas las confirmaciones son igualmente válidas."],
    usage:"Antes de entrar en cualquier zona de valor, definí qué tipo de confirmación necesitás ver. Solo ejecutá cuando esa señal aparezca, sin excepciones.",
    summary:"La confirmación es el filtro que separa entradas de calidad de las impulsivas. Exige que el precio muestre que la zona está siendo respetada antes de comprometer capital." },
  { id:23,title:"Impulso",tag:"Estructura",subtitle:"Movimiento fuerte y decisivo que desplaza el precio con convicción.",chartKind:"impulse",
    explanation:["El impulso es un movimiento fuerte, rápido y decisivo que desplaza el precio significativamente, generando evidencia estructural: FVGs, OBs y rupturas de estructura.","Los impulsos son el combustible de las tendencias. Entre impulso e impulso hay correcciones que son las oportunidades de entrada.","El impulso genera las zonas que luego usamos: FVGs alcistas, nuevos OBs, BOS.","El impulso nunca se opera directamente. Su función es definir la dirección y generar las zonas de entrada."],
    keys:["Movimiento fuerte con velas de cuerpo grande y desplazamiento significativo.","Genera FVGs, order blocks y rupturas de estructura.","Define la dirección del mercado y crea las zonas de entrada.","No se opera directamente; se espera el retroceso.","El volumen acompañante confirma la legitimidad del impulso."],
    usage:"Cuando identificás un impulso, marcá el FVG y el OB que dejó. Esperá el retroceso a esas zonas para buscar entrada en la dirección del impulso.",
    summary:"El impulso define la dirección y crea las zonas que usamos para operar. Las mejores entradas están en los retrocesos a las zonas que el impulso genera." },
  { id:24,title:"Retroceso",tag:"Estructura",subtitle:"Movimiento correctivo contra el impulso principal que ofrece la entrada.",chartKind:"correction",
    explanation:["El retroceso es el movimiento contra la dirección del impulso principal: la pausa del mercado antes de continuar. Ningún mercado sube o baja en línea recta.","Los retrocesos sanos tienen velas más pequeñas que las del impulso, menor volumen, y se detienen antes de violar el último HL estructural.","Los retrocesos más comunes se detienen entre el 38.2% y el 61.8% del impulso anterior, aunque lo clave es la zona de valor institucional.","Un retroceso que supera el 100% del impulso puede ser una reversión."],
    keys:["Movimiento contrario al impulso principal; natural e inevitable.","Velas más pequeñas y menor volumen que el impulso.","Se detiene en zonas de valor: FVG, OB, soporte/resistencia.","Si viola el punto de inicio del impulso, puede ser reversión.","La zona donde se detiene es la zona de entrada."],
    usage:"Después de un impulso, esperá el retroceso a la zona de valor (FVG, OB). Observá la calidad: pocas velas pequeñas es más sano. Buscá confirmación para entrar.",
    summary:"El retroceso es la oportunidad de entrar en la dirección del impulso con el mejor precio. Su calidad indica que la tendencia sigue sana." },
  { id:25,title:"Acumulación",tag:"Ciclo de mercado",subtitle:"Fase de consolidación donde las instituciones construyen posiciones compradoras.",chartKind:"accumulation",
    explanation:["La acumulación ocurre típicamente después de una tendencia bajista. Aparece como consolidación lateral en la parte baja. Las instituciones compran gradualmente a precios favorables.","La estructura interna: rango con soporte y resistencia. Dentro, barridos hacia abajo que activan stops de compradores y recogen liquidez barata (absorción institucional).","La confirmación llega con ruptura alcista del techo del rango seguida de retesteo exitoso de ese techo como soporte.","No toda consolidación es acumulación. La dirección de la ruptura lo confirma."],
    keys:["Consolidación lateral en zona baja después de tendencia bajista.","Las instituciones compran gradualmente sin mover el precio.","Los barridos de mínimos son señales de absorción institucional.","Confirmación: ruptura alcista con retesteo exitoso del techo.","Contexto previo (caída larga + zona de demanda) aumenta probabilidad."],
    usage:"Identificá rangos en zonas de demanda históricas después de caídas prolongadas. Observá barridos de los mínimos. Cuando el techo se rompa, buscá retesteo para entrar alcista.",
    summary:"La acumulación es donde las instituciones se posicionan silenciosamente. Reconocerla permite entrar temprano antes de que el precio suba significativamente." },
  { id:26,title:"Distribución",tag:"Ciclo de mercado",subtitle:"Fase de consolidación donde las instituciones venden sus posiciones compradoras.",chartKind:"distribution",
    explanation:["La distribución ocurre después de una tendencia alcista. Las instituciones venden gradualmente sus posiciones a los traders minoristas que compran eufóricos en los máximos.","Dentro del rango de distribución, son comunes los barridos de los máximos: precio sube falsamente, atrae compradores de breakout y revierte con fuerza.","La confirmación llega con ruptura bajista del soporte del rango y retesteo de ese soporte como resistencia.","Ocurre en momentos de máxima euforia del mercado, cuando todo parece indicar continuación alcista."],
    keys:["Consolidación lateral en zona alta después de tendencia alcista.","Las instituciones venden a los compradores minoristas.","Los barridos de máximos son señales de distribución.","Confirmación: ruptura bajista con retesteo como resistencia.","Ocurre en momentos de euforia; difícil de detectar sin conocer la estructura."],
    usage:"Identificá rangos en zonas de oferta históricas después de subidas prolongadas. Observá barridos repetidos de los máximos. Cuando el soporte se rompa, buscá retesteo para entrar bajista.",
    summary:"La distribución es donde las instituciones salen silenciosamente mientras los minoristas compran eufóricos. Reconocerla permite posicionarse antes de la caída." },
  { id:27,title:"Psicología del trader",tag:"Mentalidad",subtitle:"El control emocional que determina si ejecutás el plan o reaccionás al miedo.",chartKind:"psychology",
    explanation:["La psicología es el factor determinante. Se puede tener la mejor estrategia, pero si la ejecución está contaminada por miedo, codicia o ego, los resultados serán inconsistentes.","Los sesgos más comunes: FOMO (entrar tarde por miedo a perdérselo), trading de revancha (operar para recuperar pérdidas), sobreconfianza después de rachas ganadoras.","El ciclo emocional opera en contra del trader típico: optimismo → euforia → pánico → capitulación. Entender este ciclo y desarrollar respuesta neutral es clave.","Herramientas prácticas: diario de trading, plan con reglas claras, límites de pérdida diaria, mindfulness."],
    keys:["Las emociones sabotean la ejecución del plan.","FOMO, revancha y sobreconfianza son los enemigos más comunes.","El ciclo emocional del mercado opera en contra del trader típico.","El trading psicológicamente sano es aburrido: sin drama emocional.","Herramientas: diario, plan con reglas, límites de pérdida, mindfulness."],
    usage:"Antes de abrir el gráfico, evaluá tu estado emocional. Si estás ansioso, enojado o eufórico, tomá distancia. Operá solo en estado neutral.",
    summary:"La psicología es el factor limitante cuando la estrategia ya es sólida. Desarrollar disciplina emocional es el trabajo más importante del trader avanzado." },
  { id:28,title:"Diario de trading",tag:"Proceso",subtitle:"El registro sistemático que convierte la experiencia en mejora medible.",chartKind:"journal",
    explanation:["El diario registra sistemáticamente cada operación: razón de entrada, análisis previo, resultado, emociones y lecciones. Convierte la experiencia subjetiva en datos objetivos.","Sin diario, el trader aprende lentamente porque su único feedback es la memoria, que es selectiva. Con diario puede descubrir patrones que nunca habría notado.","Un diario efectivo incluye: captura de pantalla, setup, timeframe, sesión, R:R planificado vs real, resultado, emociones y reflexión breve.","La revisión semanal y mensual es donde se extraen las conclusiones y se construye el edge personal."],
    keys:["Registrá cada operación con captura, setup, resultado y emociones.","Convierte la experiencia subjetiva en datos objetivos.","Incluir: análisis, resultado, R:R planificado vs real, reflexión.","La revisión semanal y mensual extrae las conclusiones reales.","Permite identificar qué setups y horarios tienen mayor edge personal."],
    usage:"Antes de cerrar cada operación, tomá captura. Registrá el setup, resultado en R, estado emocional y reflexión de 2-3 líneas. Revisá el diario cada semana.",
    summary:"El diario es el sistema de mejora continua más poderoso. Sin él, la experiencia es anécdota. Con él, se convierte en datos accionables." },
  { id:29,title:"Plan de trading",tag:"Proceso",subtitle:"El conjunto de reglas que elimina las decisiones emocionales en el momento.",chartKind:"plan",
    explanation:["El plan define con precisión las condiciones para operar: qué setups buscás, en qué timeframes, en qué sesiones, cuánto arriesgás, cuándo detenés.","Sin plan, cada decisión se toma en el contexto emocional del momento. El plan elimina eso con condiciones objetivas: entro cuando se cumplan X, Y y Z.","Un plan efectivo responde: ¿Qué activos? ¿Qué timeframes? ¿Qué sesiones? ¿Cuáles setups? ¿Cuánto riesgo? ¿Cuál es el límite diario?","El plan se revisa periódicamente según los datos del diario de trading."],
    keys:["Documento escrito con reglas claras para cada decisión.","Elimina la toma de decisiones emocionales en el momento.","Debe definir: setups, timeframes, sesiones, riesgo, límites y gestión.","Se opera solo cuando se cumplen las condiciones; sin excepciones.","Se actualiza periódicamente con base en los datos del diario."],
    usage:"Escribí tu plan antes de abrir los gráficos. Si el mercado no muestra esas condiciones, no operés. Revisá y actualizá el plan mensualmente.",
    summary:"El plan convierte la estrategia en reglas y las reglas en hábitos, eliminando el factor emocional de las decisiones más importantes." },
  { id:30,title:"Backtesting",tag:"Proceso",subtitle:"Probar una estrategia en datos históricos para validar su edge real.",chartKind:"backtesting",
    explanation:["El backtesting aplica las reglas de una estrategia a datos históricos para evaluar cómo habría funcionado. Es el método científico aplicado al trading.","Requiere: reglas completamente objetivas, muestra mínima de 50-100 operaciones, período con diferentes condiciones de mercado, y honestidad del evaluador.","Métricas clave: win rate, profit factor (>1.5 para ser viable), drawdown máximo, expectativa matemática por operación.","El curve fitting es la trampa principal. La solución es el forward testing en demo antes de escalar capital real."],
    keys:["Aplicar las reglas a datos históricos antes de operar en real.","Requiere reglas objetivas, muestra mínima de 50-100 operaciones.","Métricas clave: win rate, profit factor (>1.5), drawdown, expectativa.","Evitar sobreoptimización: no cambiar reglas para el histórico.","Complementar con forward testing en demo antes de escalar capital."],
    usage:"Definí tus reglas de manera objetiva. Aplicálas a 3-6 meses de datos históricos, registrando cada operación. Analizá el profit factor y drawdown antes de operar en real.",
    summary:"El backtesting es la validación científica de una estrategia. Sin él se opera con fe; con él, con evidencia. Es el paso imprescindible para convertir una idea en un sistema confiable." },
];

// ══════════════════════════════════════════════
//  CANVAS CHART RENDERER
// ══════════════════════════════════════════════

interface CD { o:number; h:number; l:number; c:number }

type DrawFn = (ctx: CanvasRenderingContext2D, W: number, H: number, bull: boolean) => void;

const BG    = '#d6dce8';
const GRID  = '#c2c9d6';
const UP    = '#16a34a';
const DN    = '#dc2626';
const UPW   = '#15803d';
const DNW   = '#b91c1c';
const DARK  = '#1e293b';
const PURP  = '#7c3aed';
const ORANGE= '#c2410c';
const GOLD  = '#78350f';

function rr(ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number, fill?:string, stroke?:string, sw=0){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
  if(fill){ctx.fillStyle=fill; ctx.fill();}
  if(stroke&&sw>0){ctx.strokeStyle=stroke; ctx.lineWidth=sw; ctx.stroke();}
}

function lbl(ctx:CanvasRenderingContext2D, x:number, y:number, text:string, bg:string, fg='#fff', size=9.5){
  ctx.font=`800 ${size}px sans-serif`;
  const tw=ctx.measureText(text).width, pad=5;
  rr(ctx,x-tw/2-pad,y-size-2,tw+pad*2,size+8,3,bg);
  ctx.fillStyle=fg; ctx.textAlign='center'; ctx.fillText(text,x,y+1);
}

function lblL(ctx:CanvasRenderingContext2D, x:number, y:number, text:string, bg:string, fg='#fff', size=9.5){
  ctx.font=`800 ${size}px sans-serif`;
  const tw=ctx.measureText(text).width, pad=5;
  rr(ctx,x,y-size-2,tw+pad*2,size+8,3,bg);
  ctx.fillStyle=fg; ctx.textAlign='left'; ctx.fillText(text,x+pad,y+1);
}

function dline(ctx:CanvasRenderingContext2D, y:number, x1:number, x2:number, color:string, dash=[10,5], lw=1.8){
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke(); ctx.restore();
}

function zone(ctx:CanvasRenderingContext2D, y1:number, y2:number, x1:number, x2:number, color:string, alpha=0.13){
  ctx.save(); ctx.globalAlpha=alpha; ctx.fillStyle=color;
  ctx.fillRect(x1,y1,x2-x1,y2-y1); ctx.globalAlpha=1; ctx.restore();
}

function zoneBorder(ctx:CanvasRenderingContext2D, y1:number, y2:number, x1:number, x2:number, color:string){
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=1.4; ctx.setLineDash([8,4]);
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1,y2); ctx.lineTo(x2,y2); ctx.stroke();
  ctx.restore();
}

function arrow(ctx:CanvasRenderingContext2D, x1:number, y1:number, x2:number, y2:number, color:string, lw=3.5){
  const a=Math.atan2(y2-y1,x2-x1), hs=12;
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  ctx.fillStyle=color; ctx.beginPath();
  ctx.moveTo(x2,y2);
  ctx.lineTo(x2-hs*Math.cos(a-0.4),y2-hs*Math.sin(a-0.4));
  ctx.lineTo(x2-hs*Math.cos(a+0.4),y2-hs*Math.sin(a+0.4));
  ctx.closePath(); ctx.fill(); ctx.restore();
}

function badge(ctx:CanvasRenderingContext2D, x:number, y:number, text:string, bg:string){
  ctx.font='900 11px sans-serif';
  const tw=ctx.measureText(text).width;
  rr(ctx,x-tw/2-8,y-13,tw+16,21,4,bg);
  ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText(text,x,y+2);
}

function drawCandles(
  ctx:CanvasRenderingContext2D,
  candles:CD[], xs:number[], minP:number, maxP:number,
  W:number, H:number,
  PL:number, PR:number, PT:number, PB:number
){
  const CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const cw=(xs[1]-xs[0])*0.55;
  candles.forEach((c,i)=>{
    const bull=c.c>=c.o, x=xs[i];
    const hY=py(c.h), lY=py(c.l);
    const bT=py(Math.max(c.o,c.c)), bB=py(Math.min(c.o,c.c));
    const bH=Math.max(2,bB-bT);
    ctx.save(); ctx.setLineDash([]);
    ctx.strokeStyle=bull?UPW:DNW; ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.moveTo(x,hY); ctx.lineTo(x,lY); ctx.stroke();
    rr(ctx,x-cw/2,bT,cw,bH,1.5,bull?UP:DN,'#000000',0.5);
    ctx.restore();
  });
}

function drawGrid(ctx:CanvasRenderingContext2D, levels:number[], minP:number, maxP:number, W:number, H:number, PL:number, PR:number, PT:number, PB:number){
  const CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  ctx.save(); ctx.strokeStyle=GRID; ctx.lineWidth=1; ctx.setLineDash([]);
  levels.forEach(p=>{
    const y=py(p);
    ctx.beginPath(); ctx.moveTo(PL,y); ctx.lineTo(W-PR,y); ctx.stroke();
    ctx.font='700 9px sans-serif'; ctx.fillStyle='#7a8499';
    ctx.textAlign='left'; ctx.fillText(String(p),W-PR+3,y+3);
  });
  ctx.restore();
}

// ── DRAW FUNCTIONS per concept ──

const PL=10, PR=46, PT=32, PB=24;

function makeDrawer(fn:DrawFn): React.FC<{mode:'bullish'|'bearish'}> {
  return function ChartCanvas({mode}:{mode:'bullish'|'bearish'}){
    const ref=useRef<HTMLCanvasElement>(null);
    const bull=mode==='bullish';
    useEffect(()=>{
      const cv=ref.current; if(!cv) return;
      const ctx=cv.getContext('2d'); if(!ctx) return;
      const W=cv.width, H=cv.height;
      ctx.clearRect(0,0,W,H);
      rr(ctx,0,0,W,H,6,BG);
      fn(ctx,W,H,bull);
    },[bull]);
    return <canvas ref={ref} width={520} height={260} className="w-full h-full"/>;
  };
}

/* ─── LIQUIDITY ─── */
const drawLiquidity:DrawFn=(ctx,W,H,bull)=>{
  const minP=96,maxP=204, CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:170,h:176,l:162,c:165},{o:165,h:170,l:156,c:159},{o:159,h:163,l:152,c:155},
    {o:155,h:160,l:148,c:152},{o:152,h:155,l:138,c:142},// sweep
    {o:142,h:178,l:140,c:174},{o:174,h:186,l:170,c:183},{o:183,h:194,l:179,c:191},
  ]:[
    {o:138,h:146,l:132,c:142},{o:142,h:150,l:136,c:146},{o:146,h:154,l:140,c:150},
    {o:150,h:158,l:144,c:154},{o:154,h:166,l:152,c:162},// sweep
    {o:162,h:164,l:130,c:134},{o:134,h:136,l:118,c:122},{o:122,h:124,l:106,c:110},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const eqY=py(bull?142:158);
  zone(ctx,eqY-9,eqY+9,PL,W-PR,DARK,0.07);
  dline(ctx,eqY,PL,W-PR,DARK,[10,5],2);
  const swpExt=py(bull?136:168);
  zone(ctx,Math.min(eqY,swpExt),Math.max(eqY,swpExt),xs[3]-cw*0.7,xs[5]+cw*0.7,DN,0.12);
  zoneBorder(ctx,Math.min(eqY,swpExt),Math.max(eqY,swpExt),xs[3]-cw*0.7,xs[5]+cw*0.7,DNW);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lblL(ctx,PL+4,eqY-11,bull?'ZONA DE LIQUIDEZ (equal lows)':'ZONA DE LIQUIDEZ (equal highs)',DARK);
  lbl(ctx,(xs[4]+xs[5])/2,py(bull?133:171),'BARRIDO DE LIQUIDEZ',DNW);
  arrow(ctx,xs[6],bull?py(168):py(140),xs[6],bull?py(193):py(115),bull?UP:DN);
  lbl(ctx,xs[6]+30,bull?py(196):py(112),bull?'MOVIMIENTO ALCISTA':'MOVIMIENTO BAJISTA',bull?'#14532d':'#7f1d1d');
  dline(ctx,bull?py(191):py(113),xs[5],W-PR,bull?UP:DN,[5,4],1.5);
  lbl(ctx,W-PR-60,bull?py(196):py(109),bull?'LIQUIDEZ ARRIBA':'LIQUIDEZ ABAJO',DARK,'#e2e8f0',8.5);
};

/* ─── FVG ─── */
const drawFVG:DrawFn=(ctx,W,H,bull)=>{
  const minP=98,maxP=202,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:118,h:126,l:112,c:122},{o:122,h:130,l:116,c:126},
    {o:126,h:194,l:124,c:190},{o:190,h:198,l:184,c:193},
    {o:193,h:195,l:152,c:156},{o:156,h:172,l:152,c:168},
    {o:168,h:184,l:164,c:181},{o:181,h:196,l:177,c:193},
  ]:[
    {o:192,h:198,l:184,c:188},{o:188,h:192,l:178,c:182},
    {o:182,h:184,l:118,c:122},{o:122,h:126,l:110,c:114},
    {o:114,h:158,l:112,c:154},{o:154,h:158,l:138,c:142},
    {o:142,h:146,l:124,c:128},{o:128,h:132,l:112,c:116},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const fvgTop=py(bull?188:148),fvgBot=py(bull?138:112);
  zone(ctx,fvgTop,fvgBot,xs[1],W-PR,PURP,0.14);
  zoneBorder(ctx,fvgTop,fvgBot,xs[1],W-PR,PURP);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,(PL+W-PR)/2,fvgTop-10,'FAIR VALUE GAP (FVG)',PURP);
  arrow(ctx,xs[4],bull?py(188):py(118),xs[4],bull?py(165):py(138),PURP,3);
  lbl(ctx,xs[4]+50,bull?py(160):py(143),'RETORNO AL FVG',PURP);
};

/* ─── ORDER BLOCK ─── */
const drawOB:DrawFn=(ctx,W,H,bull)=>{
  const minP=96,maxP=202,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:166,h:172,l:158,c:162},{o:162,h:168,l:154,c:158},
    {o:158,h:163,l:146,c:150},{o:150,h:194,l:148,c:190},
    {o:190,h:198,l:182,c:186},{o:186,h:188,l:148,c:152},
    {o:152,h:178,l:149,c:175},{o:175,h:192,l:171,c:189},
  ]:[
    {o:142,h:148,l:136,c:142},{o:142,h:150,l:136,c:146},
    {o:146,h:160,l:142,c:156},{o:156,h:110,l:108,c:114},
    {o:114,h:118,l:104,c:108},{o:108,h:156,l:106,c:152},
    {o:152,h:154,l:128,c:132},{o:132,h:136,l:110,c:114},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[108,128,148,168,188],minP,maxP,W,H,PL,PR,PT,PB);
  const obTop=py(bull?163:160),obBot=py(bull?146:142);
  zone(ctx,obTop,obBot,xs[1],W-PR,ORANGE,0.15);
  zoneBorder(ctx,obTop,obBot,xs[1],W-PR,ORANGE);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,(PL+W-PR)/2,(obTop+obBot)/2+4,'ORDER BLOCK',ORANGE);
  lbl(ctx,xs[2],bull?py(140):py(164),bull?'ÚLTIMA VELA BAJISTA':'ÚLTIMA VELA ALCISTA',DARK,'#fdba74',8.5);
  arrow(ctx,xs[6],bull?py(162):py(150),xs[6],bull?py(190):py(118),bull?UP:DN);
};

/* ─── BOS ─── */
const drawBOS:DrawFn=(ctx,W,H,bull)=>{
  const minP=98,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:128,h:142,l:124,c:138},{o:138,h:152,l:134,c:148},
    {o:148,h:150,l:138,c:142},{o:142,h:146,l:134,c:140},
    {o:140,h:180,l:138,c:176},{o:176,h:188,l:172,c:185},
    {o:185,h:196,l:181,c:193},{o:193,h:202,l:188,c:199},
  ]:[
    {o:188,h:200,l:182,c:192},{o:192,h:194,l:176,c:180},
    {o:180,h:186,l:174,c:180},{o:180,h:182,l:170,c:176},
    {o:176,h:178,l:140,c:144},{o:144,h:148,l:130,c:134},
    {o:134,h:138,l:120,c:124},{o:124,h:128,l:110,c:114},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const bosY=py(bull?150:178);
  dline(ctx,bosY,PL,W-PR,DARK,[10,5],2);
  lblL(ctx,PL+4,bosY-11,bull?'MÁXIMO PREVIO':'MÍNIMO PREVIO',DARK);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  badge(ctx,(xs[3]+xs[4])/2,bosY,'BOS',PURP);
  arrow(ctx,(xs[3]+xs[4])/2,bosY+(bull?8:-8),(xs[3]+xs[4])/2,bull?bosY-32:bosY+32,bull?UP:DN,3);
};

/* ─── CHOCH ─── */
const drawCHOCH:DrawFn=(ctx,W,H,bull)=>{
  const minP=98,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:188,h:196,l:178,c:182},{o:182,h:186,l:170,c:174},
    {o:174,h:178,l:158,c:162},{o:162,h:165,l:144,c:148},
    {o:148,h:178,l:146,c:174},{o:174,h:186,l:170,c:183},
    {o:183,h:194,l:179,c:191},{o:191,h:200,l:186,c:197},
  ]:[
    {o:120,h:128,l:114,c:124},{o:124,h:134,l:118,c:130},
    {o:130,h:142,l:124,c:138},{o:138,h:154,l:134,c:150},
    {o:150,h:124,l:120,c:124},{o:124,h:128,l:110,c:114},
    {o:114,h:118,l:102,c:106},{o:106,h:110,l:96,c:100},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const chochY=py(bull?174:140);
  dline(ctx,chochY,PL,W-PR,PURP,[9,5],1.8);
  lblL(ctx,PL+4,chochY-11,bull?'ÚLTIMO LH — microestructura':'ÚLTIMO HL — microestructura',PURP);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,xs[3],bull?py(140):py(158),bull?'SWEEP ↓':'SWEEP ↑',ORANGE);
  badge(ctx,xs[4]+(xs[5]-xs[4])/2,chochY,'CHoCH',PURP);
  arrow(ctx,xs[5],bull?py(168):py(148),xs[5],bull?py(194):py(114),bull?UP:DN);
};

/* ─── SUPPORT ─── */
const drawSupport:DrawFn=(ctx,W,H,bull)=>{
  const minP=98,maxP=200,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:178,h:186,l:162,c:166},{o:166,h:170,l:148,c:153},
    {o:153,h:170,l:146,c:167},{o:167,h:178,l:163,c:175},
    {o:175,h:177,l:150,c:154},{o:154,h:182,l:150,c:179},
    {o:179,h:192,l:175,c:189},{o:189,h:198,l:184,c:195},
  ]:[
    {o:148,h:156,l:140,c:144},{o:144,h:148,l:132,c:136},
    {o:136,h:150,l:132,c:146},{o:146,h:148,l:130,c:134},
    {o:134,h:138,l:112,c:116},{o:116,h:140,l:114,c:136},
    {o:136,h:138,l:112,c:116},{o:116,h:120,l:100,c:104},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const supY=py(bull?149:133);
  zone(ctx,supY-9,supY+9,PL,W-PR,'#16a34a',0.14);
  dline(ctx,supY-9,PL,W-PR,'#15803d',[8,4],1.4);
  dline(ctx,supY+9,PL,W-PR,'#15803d',[8,4],1.4);
  lbl(ctx,(PL+W-PR)/2,supY-13,'ZONA DE SOPORTE',UPW);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  if(bull){
    lbl(ctx,xs[1],py(144),'1° toque',DARK,'#86efac',8.5);
    lbl(ctx,xs[4],py(146),'2° toque → entrada','#14532d','#fff',8.5);
    arrow(ctx,xs[5],py(162),xs[5],py(188),UP);
  } else {
    lbl(ctx,xs[3]+14,py(122),'RUPTURA ↓',DNW,'#fff',8.5);
    lbl(ctx,xs[5],py(138),'AHORA RESISTENCIA','#7f1d1d','#fca5a5',8.5);
    arrow(ctx,xs[6],py(134),xs[6],py(108),DN);
  }
};

/* ─── RESISTANCE ─── */
const drawResistance:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:120,h:130,l:116,c:126},{o:126,h:138,l:122,c:134},
    {o:134,h:176,l:132,c:172},{o:172,h:186,l:168,c:182},
    {o:182,h:184,l:170,c:174},{o:174,h:192,l:171,c:189},
    {o:189,h:200,l:185,c:197},{o:197,h:204,l:192,c:201},
  ]:[
    {o:120,h:130,l:116,c:126},{o:126,h:142,l:122,c:138},
    {o:138,h:174,l:135,c:170},{o:170,h:182,l:166,c:170},
    {o:170,h:172,l:152,c:156},{o:156,h:160,l:136,c:140},
    {o:140,h:144,l:120,c:124},{o:124,h:128,l:106,c:110},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const resY=py(bull?175:172);
  zone(ctx,resY-9,resY+9,PL,W-PR,'#dc2626',0.13);
  dline(ctx,resY-9,PL,W-PR,DNW,[8,4],1.4);
  dline(ctx,resY+9,PL,W-PR,DNW,[8,4],1.4);
  lbl(ctx,(PL+W-PR)/2,resY+22,'ZONA DE RESISTENCIA',DNW,'#fca5a5');
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  if(bull){
    lbl(ctx,xs[2]+20,py(184),'ROMPE ↑','#14532d','#fff',8.5);
    lbl(ctx,xs[4],py(167),'RETESTEO → SOPORTE','#14532d');
    arrow(ctx,xs[5],py(176),xs[5],py(196),UP);
  } else {
    lbl(ctx,xs[3],py(184),'RECHAZO ↓',DNW);
    arrow(ctx,xs[4],py(168),xs[4],py(140),DN);
  }
};

/* ─── UPTREND ─── */
const drawUptrend:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=208,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:114,h:130,l:110,c:126},{o:126,h:150,l:122,c:146},
    {o:146,h:148,l:132,c:136},{o:136,h:162,l:132,c:158},
    {o:158,h:160,l:144,c:148},{o:148,h:178,l:144,c:174},
    {o:174,h:176,l:160,c:164},{o:164,h:200,l:160,c:196},
  ]:[
    {o:114,h:130,l:110,c:126},{o:126,h:150,l:122,c:146},
    {o:146,h:148,l:132,c:136},{o:136,h:162,l:132,c:158},
    {o:158,h:160,l:126,c:130},{o:130,h:134,l:112,c:116},
    {o:116,h:120,l:102,c:106},{o:106,h:110,l:94,c:98},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  if(bull){
    lbl(ctx,xs[1],py(154),'HH1','#14532d');
    lbl(ctx,xs[2],py(129),'HL1','#1e3a5f');
    lbl(ctx,xs[3],py(166),'HH2','#14532d');
    lbl(ctx,xs[4],py(141),'HL2','#1e3a5f');
    lbl(ctx,xs[5],py(182),'HH3','#14532d');
    lbl(ctx,xs[6],py(157),'HL3','#1e3a5f');
    lbl(ctx,xs[7],py(202),'HH4','#14532d');
  } else {
    lbl(ctx,xs[1],py(154),'HH1','#14532d');
    lbl(ctx,xs[3],py(166),'HH2','#14532d');
    lbl(ctx,xs[4]+16,py(124),'⚠ PIERDE HL → INVALIDACIÓN','#b45309','#fff',8.5);
    arrow(ctx,xs[5],py(128),xs[5],py(106),DN);
  }
};

/* ─── DOWNTREND ─── */
const drawDowntrend:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:192,h:200,l:180,c:184},{o:184,h:188,l:164,c:168},
    {o:168,h:182,l:162,c:178},{o:178,h:180,l:152,c:156},
    {o:156,h:168,l:150,c:164},{o:164,h:196,l:160,c:192},
    {o:192,h:204,l:188,c:201},{o:201,h:204,l:195,c:202},
  ]:[
    {o:192,h:200,l:180,c:184},{o:184,h:188,l:164,c:168},
    {o:168,h:182,l:162,c:178},{o:178,h:180,l:152,c:156},
    {o:156,h:168,l:150,c:160},{o:160,h:162,l:132,c:136},
    {o:136,h:148,l:130,c:142},{o:142,h:144,l:112,c:116},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  if(!bull){
    lbl(ctx,xs[0],py(198),'LH1','#7f1d1d','#fca5a5');
    lbl(ctx,xs[1],py(162),'LL1',DNW);
    lbl(ctx,xs[2],py(180),'LH2','#7f1d1d','#fca5a5');
    lbl(ctx,xs[3],py(150),'LL2',DNW);
    lbl(ctx,xs[4],py(163),'LH3','#7f1d1d','#fca5a5');
    lbl(ctx,xs[5],py(130),'LL3',DNW);
  } else {
    lbl(ctx,xs[3]+14,py(150),'LL2',DNW,'#fff',8.5);
    lbl(ctx,xs[4]+14,py(158),'LH FALLA → CHoCH',PURP,'#fff',8.5);
    arrow(ctx,xs[5],py(148),xs[5],py(186),UP);
  }
};

/* ─── RANGE ─── */
const drawRange:DrawFn=(ctx,W,H,bull)=>{
  const minP=108,maxP=196,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=[
    {o:142,h:172,l:138,c:168},{o:168,h:176,l:154,c:158},
    {o:158,h:166,l:136,c:140},{o:140,h:166,l:136,c:162},
    {o:162,h:175,l:156,c:170},{o:170,h:178,l:148,c:152},
    {o:152,h:162,l:136,c:158},{o:158,h:174,l:154,c:171},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  const ceilY=py(176), floorY=py(138), ctrY=(ceilY+floorY)/2;
  zone(ctx,ceilY,floorY,PL,W-PR,'#64748b',0.07);
  dline(ctx,ceilY,PL,W-PR,DN,[9,5],2);
  lbl(ctx,PL+80,ceilY-10,'RESISTENCIA (TECHO)',DNW,'#fca5a5');
  dline(ctx,floorY,PL,W-PR,UP,[9,5],2);
  lbl(ctx,PL+60,floorY+18,'SOPORTE (PISO)',UPW);
  zone(ctx,ctrY-14,ctrY+14,PL,W-PR,'#b45309',0.07);
  dline(ctx,ctrY,PL,W-PR,'#b45309',[5,5],1.4);
  lbl(ctx,(PL+W-PR)/2,ctrY+5,'⚠ CENTRO — PEOR R:R',GOLD,'#fde68a');
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  arrow(ctx,W-PR-14,bull?floorY-8:ceilY+8,W-PR-14,bull?ceilY+8:floorY-8,bull?UP:DN);
};

/* ─── PULLBACK ─── */
const drawPullback:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=206,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:116,h:128,l:112,c:124},{o:124,h:176,l:122,c:172},
    {o:172,h:174,l:156,c:160},{o:160,h:164,l:148,c:152},
    {o:152,h:158,l:144,c:153},{o:153,h:194,l:150,c:190},
    {o:190,h:200,l:186,c:197},{o:197,h:204,l:192,c:201},
  ]:[
    {o:198,h:204,l:184,c:188},{o:188,h:190,l:148,c:152},
    {o:152,h:174,l:149,c:170},{o:170,h:178,l:162,c:174},
    {o:174,h:178,l:164,c:168},{o:168,h:170,l:128,c:132},
    {o:132,h:136,l:116,c:120},{o:120,h:124,l:106,c:110},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const pbT=py(bull?174:178),pbB=py(bull?144:162);
  zone(ctx,pbT,pbB,xs[1],xs[4]+cw,bull?UP:DN,0.12);
  zoneBorder(ctx,pbT,pbB,xs[1],xs[4]+cw,bull?UPW:DNW);
  lbl(ctx,(xs[2]+xs[4])/2,(pbT+pbB)/2+4,'ZONA DE PULLBACK',bull?UPW:DNW);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,xs[4],bull?py(140):py(182),'↓ ENTRADA',GOLD,'#fde68a');
  arrow(ctx,xs[5],bull?py(160):py(164),xs[5],bull?py(192):py(126),bull?UP:DN);
};

/* ─── RETEST ─── */
const drawRetest:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=206,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:116,h:128,l:112,c:124},{o:124,h:166,l:121,c:162},
    {o:162,h:198,l:160,c:194},{o:194,h:202,l:188,c:197},
    {o:197,h:199,l:160,c:164},{o:164,h:168,l:158,c:166},
    {o:166,h:196,l:163,c:193},{o:193,h:204,l:189,c=201},
  ]:[
    {o:198,h:204,l:184,c:188},{o:188,h:190,l:168,c:172},
    {o:172,h:174,l:136,c:140},{o:140,h:144,l:128,c:132},
    {o:132,h:170,l:130,c:166},{o:166,h:168,l:160,c:162},
    {o:162,h:164,l=134,c:138},{o:138,h:142,l:118,c:122},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const lvl=py(bull?164:168);
  dline(ctx,lvl,PL,W-PR,bull?UPW:DNW,[9,5],2);
  lblL(ctx,PL+4,lvl-11,bull?'RESISTENCIA ROTA → SOPORTE':'SOPORTE ROTO → RESISTENCIA',bull?UPW:DNW);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  badge(ctx,(xs[3]+xs[4])/2,lvl,'RETESTEO',PURP);
  arrow(ctx,xs[6],bull?py(174):py(162),xs[6],bull?py(196):py(132),bull?UP:DN);
};

/* ─── STOP LOSS ─── */
const drawSL:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=208,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:124,h:134,l:120,c:130},{o:130,h:142,l:126,c:138},
    {o:138,h:150,l:134,c:146},{o:146,h:164,l:142,c:160},
    {o:160,h:180,l:158,c:177},{o:177,h:194,l:173,c:191},
    {o:191,h:202,l:187,c:199},{o:199,h:207,l:194,c:204},
  ]:[
    {o:196,h:204,l:188,c:192},{o:192,h:196,l:178,c:182},
    {o:182,h:186,l:168,c:172},{o:172,h:176,l:154,c:158},
    {o:158,h:162,l=136,c:140},{o:140,h:144,l:120,c:124},
    {o:124,h:128,l:106,c:110},{o:110,h:114,l:92,c:96},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const entryY=py(bull?148:180), slY=py(bull?122:202);
  dline(ctx,entryY,PL,W-PR,DARK,[9,5],2);
  lblL(ctx,PL+4,entryY-11,'PRECIO DE ENTRADA',DARK);
  zone(ctx,Math.min(entryY,slY),Math.max(entryY,slY),PL,W-PR,DN,0.09);
  dline(ctx,slY,PL,W-PR,DNW,[6,4],1.8);
  lblL(ctx,PL+4,slY+(bull?16:-11),'STOP LOSS — INVALIDACIÓN',DNW,'#fca5a5');
  lbl(ctx,(PL+W-PR)/2,(entryY+slY)/2+4,'ZONA DE RIESGO (1R)',DNW,'#fca5a5',9);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
};

/* ─── TAKE PROFIT ─── */
const drawTP:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=210,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:116,h:126,l:112,c:122},{o:122,h:134,l:118,c:130},
    {o:130,h:142,l=126,c:138},{o:138,h:168,l:135,c:164},
    {o:164,h:188,l:160,c:184},{o:184,h:202,l:180,c:198},
    {o:198,h:207,l:194,c:204},{o:204,h:210,l:200,c:207},
  ]:[
    {o:202,h:208,l:196,c:200},{o:200,h:204,l:188,c:192},
    {o:192,h:196,l:180,c=184},{o:184,h:188,l:158,c:162},
    {o:162,h:166,l:136,c:140},{o:140,h:144,l:116,c:120},
    {o:120,h:124,l:100,c:104},{o:104,h:108,l:88,c:92},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const entryY=py(bull?140:196), tp1Y=py(bull?184:152), tp2Y=py(bull?206:108);
  dline(ctx,entryY,PL,W-PR,DARK,[9,5],2);
  lblL(ctx,PL+4,entryY-11,'ENTRADA',DARK);
  dline(ctx,tp1Y,PL,W-PR,UPW,[8,4],1.6);
  lblL(ctx,PL+4,tp1Y-11,'TP1 — PARCIAL 50%','#14532d');
  dline(ctx,tp2Y,PL,W-PR,'#052e16',[7,4],1.6);
  lblL(ctx,PL+4,tp2Y-11,'TP2 — OBJETIVO FINAL','#052e16');
  zone(ctx,Math.min(entryY,tp1Y),Math.max(entryY,tp1Y),W-PR-16,W-PR,UP,0.5);
  zone(ctx,Math.min(tp1Y,tp2Y),Math.max(tp1Y,tp2Y),W-PR-16,W-PR,UP,0.3);
  ctx.font='900 10px sans-serif'; ctx.fillStyle=UPW; ctx.textAlign='center';
  ctx.fillText('1R',W-PR-8,(entryY+tp1Y)/2+4);
  ctx.fillStyle='#14532d';
  ctx.fillText('2R',W-PR-8,(tp1Y+tp2Y)/2+4);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
};

/* ─── RISK REWARD ─── */
const drawRR:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=210,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:116,h:128,l:112,c:124},{o:124,h:138,l:120,c:134},
    {o:134,h:148,l:130,c:144},{o:144,h:178,l=141,c:174},
    {o:174,h:196,l:170,c:192},{o:192,h:208,l:188,c:205},
    {o:205,h:210,l:200,c:207},{o:207,h:210,l:202,c:208},
  ]:[
    {o:204,h:210,l:196,c:200},{o:200,h:204,l:186,c:190},
    {o:190,h:194,l:176,c:180},{o:180,h:184,l:150,c:154},
    {o:154,h:158,l:124,c:128},{o:128,h:132,l:100,c:104},
    {o:104,h:108,l:86,c:90},{o:90,h:94,l:74,c:78},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[110,130,150,170,190],minP,maxP,W,H,PL,PR,PT,PB);
  const entryY=py(bull?146:192), slY=py(bull?122:208), tp1Y=py(bull?178:162), tp2Y=py(bull?206:120);
  dline(ctx,slY,PL,W-PR,DNW,[6,4],1.6);
  dline(ctx,entryY,PL,W-PR,DARK,[9,5],2);
  dline(ctx,tp1Y,PL,W-PR,UPW,[8,4],1.6);
  dline(ctx,tp2Y,PL,W-PR,'#052e16',[7,4],1.6);
  lblL(ctx,PL+4,slY+(bull?14:-11),'SL',DNW,'#fca5a5',8.5);
  lblL(ctx,PL+4,entryY-11,'ENTRY',DARK,'#fff',8.5);
  lblL(ctx,PL+4,tp1Y-11,'TP1  1R','#14532d','#fff',8.5);
  lblL(ctx,PL+4,tp2Y-11,'TP2  2R','#052e16','#fff',8.5);
  const risk=Math.abs(entryY-slY);
  const bx=W-PR-18;
  rr(ctx,bx,Math.min(entryY,slY),14,risk,2,DN+Math.round(0.7*255).toString(16).padStart(2,'0'));
  ctx.font='900 10px sans-serif'; ctx.fillStyle=DNW; ctx.textAlign='center';
  ctx.fillText('1R',bx+7,(entryY+slY)/2+4);
  rr(ctx,bx,Math.min(entryY,tp2Y),14,Math.abs(entryY-tp2Y),2,UP+'55');
  ctx.fillStyle=UPW; ctx.fillText('2R',bx+7,(entryY+tp2Y)/2+4);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
};

/* ─── RISK MANAGEMENT ─── */
const drawRM:DrawFn=(ctx,W,H,_bull)=>{
  const good=[100,102,100,106,110,108,115,120,118,126,122,132];
  const bad=[100,114,88,120,72,108,56,90,36,74,24,58];
  const L=44,T=24,B=36,maxV=138,minV=18;
  const scX=(i:number)=>L+(i/(good.length-1))*(W-L-PR+20);
  const scY=(v:number)=>T+((maxV-v)/(maxV-minV))*(H-T-B);
  ctx.save(); ctx.strokeStyle=GRID; ctx.lineWidth=1; ctx.setLineDash([]);
  [40,60,80,100,120].forEach(v=>{
    const y=scY(v);
    ctx.beginPath(); ctx.moveTo(L,y); ctx.lineTo(W-PR+20,y); ctx.stroke();
    ctx.font='700 9px sans-serif'; ctx.fillStyle='#7a8499'; ctx.textAlign='left';
    ctx.fillText(String(v),L-30,y+3);
  });
  ctx.restore();
  dline(ctx,scY(100),L,W-PR+20,'#94a3b8',[5,4],1.5);
  ctx.save(); ctx.strokeStyle=DN; ctx.lineWidth=2.5; ctx.setLineDash([]);
  ctx.beginPath(); bad.forEach((v,i)=>{ const x=scX(i),y=scY(v); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }); ctx.stroke();
  bad.forEach((v,i)=>{ rr(ctx,scX(i)-4,scY(v)-4,8,8,4,v>=100?DN:'#7f1d1d'); });
  ctx.strokeStyle=UP; ctx.lineWidth=3;
  ctx.beginPath(); good.forEach((v,i)=>{ const x=scX(i),y=scY(v); i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }); ctx.stroke();
  good.forEach((v,i)=>{ rr(ctx,scX(i)-4,scY(v)-4,8,8,4,UP); });
  ctx.restore();
  lbl(ctx,scX(11)-40,scY(good[11])-10,'✔ RIESGO FIJO 1%','#14532d');
  lbl(ctx,scX(11)-40,scY(bad[11])+18,'✘ SIN GESTIÓN',DNW,'#fca5a5');
};

/* ─── SESSIONS ─── */
const drawSessions:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=208,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const asiaEnd=PL+((W-PL-PR)*0.35), londonEnd=PL+((W-PL-PR)*0.65);
  zone(ctx,PT,H-PB,PL,asiaEnd,'#3b82f6',0.05);
  zone(ctx,PT,H-PB,asiaEnd,londonEnd,'#f59e0b',0.05);
  zone(ctx,PT,H-PB,londonEnd,W-PR,'#16a34a',0.05);
  ctx.save(); ctx.strokeStyle='#3b82f6'; ctx.lineWidth=1.5; ctx.setLineDash([5,4]); ctx.globalAlpha=0.5;
  ctx.beginPath(); ctx.moveTo(asiaEnd,PT); ctx.lineTo(asiaEnd,H-PB); ctx.stroke();
  ctx.strokeStyle='#f59e0b';
  ctx.beginPath(); ctx.moveTo(londonEnd,PT); ctx.lineTo(londonEnd,H-PB); ctx.stroke();
  ctx.restore();
  lbl(ctx,(PL+asiaEnd)/2,PT+16,'🌏 ASIA','#1e3a8a','#93c5fd');
  lbl(ctx,(asiaEnd+londonEnd)/2,PT+16,'🇬🇧 LONDON','#78350f','#fde68a');
  lbl(ctx,(londonEnd+W-PR)/2,PT+16,'🇺🇸 NY','#14532d','#86efac');
  const candles:CD[]=[
    {o:148,h:154,l:144,c:151},{o:151,h:157,l:146,c:153},{o:153,h:158,l:148,c:152},
    {o:152,h:157,l:bull?136:166,c:bull?140:162},
    {o:bull?140:162,h:bull?164:164,l:bull?138:150,c:bull?161:153},
    {o:bull?161:153,h:bull?182:155,l:bull?158:138,c:bull?179:141},
    {o:bull?179:141,h:bull?196:143,l:bull?175:128,c:bull?193:131},
    {o:bull?193:131,h:bull?202:133,l:bull?189:118,c:bull?199:121},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  const rY=py(152),rY2=py(142);
  zone(ctx,rY2,rY,PL+2,asiaEnd-2,'#3b82f6',0.12);
  zoneBorder(ctx,rY2,rY,PL+2,asiaEnd-2,'#3b82f6');
  lbl(ctx,(PL+asiaEnd)/2,(rY+rY2)/2+4,'RANGO ASIA','#1e3a8a','#93c5fd',8.5);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,xs[3],bull?py(132):py(166),bull?'SWEEP ↓':'SWEEP ↑',ORANGE);
  arrow(ctx,xs[5],bull?py(158):py(150),xs[5],bull?py(188):py(128),bull?UP:DN);
};

/* ─── VOLUME ─── */
const drawVolume:DrawFn=(ctx,W,H,bull)=>{
  const minP=102,maxP=200,chartB=H-PB-70;
  const PT2=PT;
  const py=(p:number)=>PT2+(1-(p-minP)/(maxP-minP))*(chartB-PT2);
  const candles:CD[]=bull?[
    {o:124,h:132,l:120,c:128},{o:128,h:136,l:124,c:132},{o:132,h:140,l:128,c:136},
    {o:136,h:144,l:132,c:140},{o:140,h:194,l:138,c:190},
    {o:190,h:198,l:186,c:195},{o:195,h:200,l=191,c:198},{o:198,h:200,l:194,c:198},
  ]:[
    {o:188,h:196,l:182,c:186},{o:186,h:190,l:176,c:180},{o:180,h:184,l:170,c:174},
    {o:174,h:178,l:164,c:168},{o:168,h:170,l:118,c:122},
    {o:122,h:126,l:110,c:114},{o:114,h:118,l:104,c:108},{o:108,h:112,l:100,c:104},
  ];
  const vols=[10,12,11,13,60,18,16,20];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  const volH=58, volBase=H-PB-4, volMax=64;
  ctx.save(); ctx.strokeStyle=GRID; ctx.lineWidth=1; ctx.setLineDash([]);
  [120,140,160,180].forEach(p=>{ const y=py(p); ctx.beginPath(); ctx.moveTo(PL,y); ctx.lineTo(W-PR,y); ctx.stroke(); });
  ctx.beginPath(); ctx.moveTo(PL,chartB+2); ctx.lineTo(W-PR,chartB+2); ctx.stroke();
  ctx.restore();
  vols.forEach((v,i)=>{
    const bh=(v/volMax)*volH;
    rr(ctx,xs[i]-8,volBase-bh,16,bh,1.5,v>30?(bull?UP:DN):'#94a3b8');
  });
  ctx.font='700 8px sans-serif'; ctx.fillStyle='#64748b'; ctx.textAlign='left';
  ctx.fillText('VOL',PL+2,volBase-2);
  candles.forEach((c,i)=>{
    const b=c.c>=c.o, x=xs[i];
    const bT=py(Math.max(c.o,c.c)),bB=py(Math.min(c.o,c.c)),bHH=Math.max(2,bB-bT);
    ctx.save(); ctx.setLineDash([]);
    ctx.strokeStyle=b?UPW:DNW; ctx.lineWidth=1.6;
    ctx.beginPath(); ctx.moveTo(x,py(c.h)); ctx.lineTo(x,py(c.l)); ctx.stroke();
    rr(ctx,x-8,bT,16,bHH,1.5,b?UP:DN,'#000000',0.5);
    ctx.restore();
  });
  lbl(ctx,xs[4],bull?py(198):py(115),bull?'VOLUMEN FUERTE ↑':'VOLUMEN FUERTE ↓',bull?UPW:DNW);
};

/* ─── MANIPULATION ─── */
const drawManipulation:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:164,h:170,l:156,c:160},{o:160,h:166,l=152,c:156},{o:156,h:162,l:148,c:153},
    {o:153,h:155,l:128,c:136},{o:136,h:196,l:134,c:192},
    {o:192,h:200,l:188,c:197},{o:197,h:204,l:192,c=201},{o:201,h:204,l:196,c:202},
  ]:[
    {o:140,h:146,l:134,c:142},{o:142,h:150,l:136,c:146},{o:146,h:154,l:140,c:150},
    {o:150,h:180,l:148,c:174},{o:174,h:176,l:140,c:144},
    {o:144,h:148,l:128,c:132},{o:132,h:136,l:116,c:120},{o:120,h:124,l:104,c:108},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const lvl=py(bull?154:152), fakeExt=py(bull?128:180);
  dline(ctx,lvl,PL,W-PR,DARK,[10,5],2);
  lblL(ctx,PL+4,lvl-11,bull?'NIVEL OBVIO (equal lows)':'NIVEL OBVIO (equal highs)',DARK);
  zone(ctx,Math.min(lvl,fakeExt),Math.max(lvl,fakeExt),xs[2]-cw*0.6,xs[4]+cw*0.6,DN,0.12);
  zoneBorder(ctx,Math.min(lvl,fakeExt),Math.max(lvl,fakeExt),xs[2]-cw*0.6,xs[4]+cw*0.6,DNW);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,(xs[3]+xs[4])/2,(lvl+fakeExt)/2+4,'FAKE BREAK',DNW,'#fca5a5');
  lbl(ctx,xs[3],bull?py(124):py(184),bull?'TRAMPA BAJISTA':'TRAMPA ALCISTA',DNW,'#fca5a5',8.5);
  arrow(ctx,xs[4]+cw*0.3,bull?py(148):py(168),xs[4]+cw*0.3,bull?py(188):py(136),bull?UP:DN);
  lbl(ctx,xs[5],bull?py(192):py(132),bull?'GIRO VIOLENTO ↑':'GIRO VIOLENTO ↓',bull?UPW:DNW);
};

/* ─── SWEEP ─── */
const drawSweep:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:160,h:168,l:154,c:164},{o:164,h:170,l:156,c:160},{o:160,h:166,l:152,c:162},
    {o:162,h:164,l:132,c:148},{o:148,h:186,l:146,c:182},
    {o:182,h:196,l:178,c:193},{o:193,h:202,l:188,c:199},{o:199,h:204,l:194,c:201},
  ]:[
    {o:144,h:152,l:138,c:148},{o:148,h:156,l:142,c:152},{o:152,h:158,l:146,c=154},
    {o:154,h:180,l:152,c:164},{o:164,h:166,l:136,c:140},
    {o:140,h:144,l:124,c:128},{o:128,h:132,l:112,c:116},{o:116,h:120,l:102,c:106},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const eqY=py(bull?155:155), swpExt=py(bull?132:180);
  dline(ctx,eqY,PL,W-PR,DARK,[10,5],2);
  lblL(ctx,PL+4,eqY-11,bull?'EQUAL LOWS (stops aquí)':'EQUAL HIGHS (stops aquí)',DARK);
  zone(ctx,Math.min(eqY,swpExt),Math.max(eqY,swpExt),xs[2],xs[4],ORANGE,0.14);
  zoneBorder(ctx,Math.min(eqY,swpExt),Math.max(eqY,swpExt),xs[2],xs[4],ORANGE);
  lbl(ctx,(xs[2]+xs[4])/2,(eqY+swpExt)/2+4,'SWEEP',ORANGE);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  arrow(ctx,xs[4]+cw*0.3,bull?py(154):py(158),xs[4]+cw*0.3,bull?py(188):py(128),bull?UP:DN);
  lbl(ctx,xs[5],bull?py(192):py(124),'GIRO TRAS SWEEP',bull?UPW:DNW);
};

/* ─── INSTITUTIONAL ─── */
const drawInstitutional:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:160,h:168,l:152,c:156},{o:156,h:162,l:148,c:152},
    {o:152,h:154,l:128,c:134},{o:134,h:188,l:132,c:184},
    {o:184,h:186,l:154,c:158},{o:158,h:163,l=152,c:160},
    {o:160,h=196,l:157,c:192},{o:192,h:204,l:188,c:201},
  ]:[
    {o:148,h:156,l:142,c:152},{o:152,h:160,l:146,c:156},
    {o:156,h:182,l:154,c:178},{o:178,h:180,l:148,c:152},
    {o:152,h:172,l:150,c:168},{o:168,h:170,l:162,c:165},
    {o:165,h:167,l:136,c:140},{o:140,h:144,l:120,c:124},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const fvgT=py(bull?184:172),fvgB=py(bull?158:150);
  zone(ctx,fvgT,fvgB,xs[3],xs[5]+cw*0.5,PURP,0.15);
  zoneBorder(ctx,fvgT,fvgB,xs[3],xs[5]+cw*0.5,PURP);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,(xs[4]+xs[5])/2,(fvgT+fvgB)/2+4,'④ FVG / OB',PURP);
  lbl(ctx,xs[1],bull?py(144):py(162),'① Liquidez',GOLD,'#fde68a',8.5);
  lbl(ctx,xs[2],bull?py(122):py(186),'② Sweep',ORANGE,'#fff',8.5);
  lbl(ctx,xs[3],bull?py(190):py(144),'③ CHoCH',PURP,'#fff',8.5);
  lbl(ctx,xs[6]+16,bull?py(196):py(132),'⑤ ENTRADA',bull?UPW:DNW,'#fff',8.5);
  arrow(ctx,xs[6],bull?py(164):py(162),xs[6],bull?py(196):py(132),bull?UP:DN);
};

/* ─── CONFIRMATION ─── */
const drawConfirmation:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=206,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:158,h:166,l:150,c:154},{o:154,h:160,l=142,c:147},
    {o:147,h:152,l=140,c:146},{o:146,h=186,l:144,c:182},
    {o:182,h:194,l:178,c:191},{o:191,h:202,l:187,c:199},
    {o:199,h:204,l:195,c:201},{o:201,h:204,l:197,c:203},
  ]:[
    {o:150,h:158,l:144,c:154},{o:154,h:174,l:152,c:170},
    {o:170,h:173,l:164,c:167},{o:167,h:169,l:142,c=146},
    {o:146,h:150,l:130,c:134},{o:134,h:138,l:118,c:122},
    {o:122,h:126,l:108,c:112},{o:112,h:116,l:100,c:104},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const zT=py(bull?154:174),zB=py(bull?140:162);
  zone(ctx,zT,zB,PL,W-PR,bull?UP:DN,0.13);
  zoneBorder(ctx,zT,zB,PL,W-PR,bull?UPW:DNW);
  lbl(ctx,(PL+W-PR)/2,zT-11,bull?'ZONA DE DEMANDA':'ZONA DE OFERTA',bull?UPW:DNW);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  const cx=xs[3], cy=bull?py(186):py(170);
  ctx.save(); ctx.strokeStyle=GOLD; ctx.lineWidth=2.5; ctx.setLineDash([4,3]);
  const bH=Math.abs(zT-zB);
  ctx.strokeRect(cx-10,Math.min(zT,zB)-4,20,bH+8); ctx.restore();
  lbl(ctx,cx,bull?py(192):py(134),'CONFIRMACIÓN',GOLD,'#fde68a');
  arrow(ctx,xs[4],bull?py(164):py(160),xs[4],bull?py(194):py(128),bull?UP:DN);
};

/* ─── IMPULSE ─── */
const drawImpulse:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=208,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:116,h:126,l:112,c:122},{o:122,h:132,l:118,c:128},{o:128,h:138,l:124,c=134},
    {o:134,h=202,l:132,c:198},{o:198,h:207,l:194,c:204},
    {o:204,h:207,l:199,c:205},{o:205,h:207,l:201,c:206},{o:206,h:208,l:202,c:207},
  ]:[
    {o:200,h:207,l:194,c:204},{o:204,h:207,l:198,c:202},{o:202,h:205,l:196,c:200},
    {o:200,h:202,l:118,c:122},{o:122,h:126,l:110,c:114},
    {o:114,h:118,l:104,c:108},{o:108,h:112,l:100,c:104},{o:104,h:108,l:98,c:102},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const fvgT=py(bull?198:142),fvgB=py(bull?140:168);
  zone(ctx,fvgT,fvgB,xs[2],xs[4]+cw*0.5,PURP,0.14);
  zoneBorder(ctx,fvgT,fvgB,xs[2],xs[4]+cw*0.5,PURP);
  lbl(ctx,(xs[2]+xs[4])/2,(fvgT+fvgB)/2+4,'FVG GENERADO',PURP);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,xs[3],bull?py(206):py(113),'IMPULSO',bull?UPW:DNW);
};

/* ─── CORRECTION ─── */
const drawCorrection:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=208,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:116,h=184,l:114,c:180},{o:180,h:184,l:162,c:166},
    {o:166,h:170,l:150,c:154},{o:154,h:160,l:144,c:152},
    {o:152,h=200,l:150,c:196},{o:196,h:204,l:192,c:201},
    {o:201,h:206,l:197,c:203},{o:203,h:207,l:199,c:206},
  ]:[
    {o:198,h:200,l=132,c:136},{o:136,h=172,l:134,c:168},
    {o:168,h:178,l:160,c:174},{o:174,h:180,l:162,c:170},
    {o:170,h:172,l=120,c:124},{o:124,h:128,l:110,c:114},
    {o:114,h:118,l:102,c:106},{o:106,h:110,l:96,c:100},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const cT=py(bull?182:180),cB=py(bull?144:158);
  zone(ctx,cT,cB,xs[0]+cw*0.4,xs[3]+cw*0.6,GOLD,0.12);
  zoneBorder(ctx,cT,cB,xs[0]+cw*0.4,xs[3]+cw*0.6,GOLD);
  lbl(ctx,(xs[1]+xs[3])/2,(cT+cB)/2+4,'ZONA DE RETROCESO',GOLD,'#fde68a');
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,xs[0],bull?py(188):py(126),'Impulso',bull?UPW:DNW,undefined,8.5);
  lbl(ctx,xs[4]+16,bull?py(200):py(116),bull?'Continúa ↑':'Continúa ↓',bull?UPW:DNW,undefined,8.5);
  arrow(ctx,xs[4],bull?py(160):py(168),xs[4],bull?py(196):py(122),bull?UP:DN);
};

/* ─── ACCUMULATION ─── */
const drawAccumulation:DrawFn=(ctx,W,H,bull)=>{
  const minP=100,maxP=204,CH=H-PT-PB;
  const py=(p:number)=>PT+(1-(p-minP)/(maxP-minP))*CH;
  const candles:CD[]=bull?[
    {o:186,h:194,l:162,c:166},{o:166,h:170,l:152,c:156},
    {o:156,h:170,l:140,c:162},{o:162,h:172,l:142,c:148},
    {o:148,h:150,l=126,c:130},{o:130,h=166,l:128,c:162},
    {o:162,h=178,l:159,c:175},{o:175,h=200,l:172,c:197},
  ]:[
    {o:118,h:126,l:112,c:122},{o:122,h:134,l:118,c:130},
    {o:130,h:148,l:124,c:142},{o:142,h:158,l:136,c:152},
    {o:152,h=180,l:150,c:174},{o:174,h:176,l=146,c:150},
    {o:150,h:154,l:128,c:132},{o:132,h:136,l:106,c:110},
  ];
  const N=candles.length, cw=(W-PL-PR)/N;
  const xs=candles.map((_,i)=>PL+(i+0.5)*cw);
  drawGrid(ctx,[112,132,152,172,192],minP,maxP,W,H,PL,PR,PT,PB);
  const rT=py(bull?172:178),rB=py(bull?140:142);
  zone(ctx,rT,rB,xs[1],xs[5]+cw*0.5,bull?UP:DN,0.09);
  dline(ctx,rT,xs[1],xs[5]+cw*0.5,bull?UPW:DNW,[8,4],1.6);
  dline(ctx,rB,xs[1],xs[5]+cw*0.5,bull?UPW:DNW,[8,4],1.6);
  lbl(ctx,(xs[2]+xs[4])/2,rT-12,bull?'ACUMULACIÓN':'DISTRIBUCIÓN',bull?UPW:DNW,undefined,11);
  drawCandles(ctx,candles,xs,minP,maxP,W,H,PL,PR,PT,PB);
  lbl(ctx,xs[4],bull?py(122):py(184),bull?'SWEEP ↓':'SWEEP ↑',ORANGE);
  arrow(ctx,xs[7],bull?py(172):py(144),xs[7],bull?py(200):py(108),bull?UP:DN);
  lbl(ctx,xs[7],bull?py(204):py(104),bull?'EXPANSIÓN ↑':'CAÍDA ↓',bull?UPW:DNW,undefined,8.5);
};

const drawDistribution:DrawFn=(ctx,W,H,bull)=>drawAccumulation(ctx,W,H,!bull);

/* ─── PSYCHOLOGY ─── */
const drawPsychology:DrawFn=(ctx,W,H,bull)=>{
  const stages=bull?[
    {label:'Esperanza',x:68,y:160,c:'#15803d'},{label:'Optimismo',x:140,y:122,c:'#16a34a'},
    {label:'Euforia',x:230,y:68,c:'#b45309'},{label:'FOMO',x:300,y:58,c:'#d97706'},
    {label:'Negación',x:366,y:100,c:'#b91c1c'},{label:'Pánico',x:430,y:178,c:'#991b1b'},
  ]:[
    {label:'Euforia',x:68,y:72,c:'#b45309'},{label:'Negación',x:140,y:104,c:'#b91c1c'},
    {label:'Miedo',x:214,y:140,c:'#991b1b'},{label:'Pánico',x:292,y=188,c:'#7f1d1d'},
    {label:'Capitulac.',x:366,y:216,c:'#6b1a1a'},{label:'Depresión',x:430,y:226,c:'#450a0a'},
  ];
  const path=bull
    ?[[55,164],[90,144],[120,124],[140,122],[183,102],[212,80],[230,70],[256,62],[294,60],[310,60],[332,66],[352,80],[366,102],[392,136],[418,166],[434,180]]
    :[[55,76],[90,88],[118,100],[140,106],[166,118],[192,134],[214,143],[244,162],[270,180],[292,190],[316,204],[344,216],[366,220],[392,224],[418,226],[440,228]];
  [60,100,140,180,220].forEach(y=>{
    ctx.save(); ctx.strokeStyle=GRID; ctx.lineWidth=1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(PL,y); ctx.lineTo(W-PR+30,y); ctx.stroke(); ctx.restore();
  });
  ctx.save(); ctx.strokeStyle=bull?UP:DN; ctx.lineWidth=3.5; ctx.setLineDash([]);
  ctx.beginPath(); path.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)); ctx.stroke(); ctx.restore();
  stages.forEach(s=>{
    rr(ctx,s.x-5,s.y-5,10,10,5,s.c);
    lbl(ctx,s.x,s.y-14,s.label,s.c,'#fff',8);
  });
  lbl(ctx,(PL+W-PR)/2,H-8,bull?'Comprar en miedo, no en euforia':'Vender en euforia, no en pánico','#312e81');
};

/* ─── JOURNAL ─── */
const drawJournal:DrawFn=(ctx,W,H,bull)=>{
  const months=['Ene','Feb','Mar','Abr','May','Jun'];
  const wr=bull?[38,43,47,52,57,63]:[62,55,50,46,43,40];
  const pnl=bull?[-9,3,8,16,24,34]:[18,10,2,-6,-14,-24];
  const scX=(i:number)=>56+i*82;
  const scWR=(v:number)=>188-((v-30)/40)*130;
  const scPnL=(v:number)=>188-((v+26)/62)*130;
  [58,98,138,188].forEach(y=>{
    ctx.save(); ctx.strokeStyle=GRID; ctx.lineWidth=1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(44,y); ctx.lineTo(W-PR+20,y); ctx.stroke(); ctx.restore();
  });
  dline(ctx,scPnL(0),44,W-PR+20,'#94a3b8',[5,4],1.5);
  pnl.forEach((v,i)=>{
    const h=Math.abs(scPnL(0)-scPnL(v)),isP=v>=0;
    rr(ctx,scX(i)-12,isP?scPnL(v):scPnL(0),24,h,2,isP?UP:DN+((0.8*255)|0).toString(16).padStart(2,'0'));
  });
  ctx.save(); ctx.strokeStyle=PURP; ctx.lineWidth=2.5; ctx.setLineDash([]);
  ctx.beginPath(); wr.forEach((v,i)=>i===0?ctx.moveTo(scX(i),scWR(v)):ctx.lineTo(scX(i),scWR(v))); ctx.stroke();
  wr.forEach((v,i)=>{ rr(ctx,scX(i)-5,scWR(v)-5,10,10,5,PURP); });
  ctx.restore();
  months.forEach((m,i)=>{ ctx.font='700 9px sans-serif'; ctx.fillStyle='#64748b'; ctx.textAlign='center'; ctx.fillText(m,scX(i),H-10); });
  rr(ctx,PL+4,H-26,10,10,5,PURP);
  ctx.font='700 8.5px sans-serif'; ctx.fillStyle=PURP; ctx.textAlign='left'; ctx.fillText('Win rate',PL+18,H-18);
  rr(ctx,PL+80,H-26,10,10,2,bull?UP:DN);
  ctx.fillStyle=bull?UP:DN; ctx.fillText('PnL',PL+94,H-18);
  lbl(ctx,W-PR-50,H-18,bull?'Mejora con registro':'Sin registro = sin mejora','#312e81','#fff',8.5);
};

/* ─── PLAN ─── */
const drawPlan:DrawFn=(ctx,W,H,bull)=>{
  const boxes=[
    {x:W/2,y:36, w:144,h:28,label:'¿Setup válido?',  color:'#4338ca'},
    {x:W/2-130,y:98, w:124,h:28,label:'NO → Esperar',  color:DN},
    {x:W/2+130,y:98, w:124,h:28,label:'SÍ → Verificar',color:UP},
    {x:W/2,y:160,w:144,h:28,label:bull?'Definir SL/TP':'Calcular lote',color:'#b45309'},
    {x:W/2,y:220,w:144,h:28,label:bull?'EJECUTAR':'NO SIN PLAN',color:bull?UP:DN},
  ];
  const arrs:Array<[number,number,number,number]>=[
    [W/2,64,W/2-130,98],[W/2,64,W/2+130,98],
    [W/2+130,126,W/2+16,160],[W/2,188,W/2,220],
  ];
  ctx.save(); ctx.strokeStyle='#94a3b8'; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
  arrs.forEach(([x1,y1,x2,y2])=>{
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  });
  ctx.restore();
  boxes.forEach(b=>{
    rr(ctx,b.x-b.w/2,b.y,b.w,b.h,5,b.color+'22','',0);
    ctx.save(); ctx.setLineDash([]); ctx.strokeStyle=b.color; ctx.lineWidth=1.5;
    rr(ctx,b.x-b.w/2,b.y,b.w,b.h,5,'',b.color,1.5); ctx.restore();
    ctx.font=`800 9px sans-serif`; ctx.fillStyle=b.color; ctx.textAlign='center';
    ctx.fillText(b.label,b.x,b.y+18);
  });
};

/* ─── BACKTESTING ─── */
const drawBacktesting:DrawFn=(ctx,W,H,bull)=>{
  const rows=[
    {n:1,dir:'L',setup:'FVG + BOS',     rr:'1:2',  res:bull?'WIN':'LOSS'},
    {n:2,dir:'L',setup:'OB + CHoCH',    rr:'1:2',  res:bull?'WIN':'LOSS'},
    {n:3,dir:'S',setup:'FVG + Sweep',   rr:'1:1.5',res:bull?'LOSS':'WIN'},
    {n:4,dir:'L',setup:'Sweep + OB',    rr:'1:3',  res:'WIN'},
    {n:5,dir:'S',setup:'CHoCH + FVG',   rr:'1:2',  res:bull?'LOSS':'WIN'},
    {n:6,dir:'L',setup:'BOS + Pullback',rr:'1:2',  res:bull?'WIN':'LOSS'},
  ];
  const wins=rows.filter(r=>r.res==='WIN').length;
  const cols=[46,84,210,344,450];
  const heads=['#','Dir','Setup','R:R','Resultado'];
  rr(ctx,20,16,W-44,28,4,GRID);
  ctx.font='700 8.5px sans-serif'; ctx.fillStyle='#475569';
  heads.forEach((h,i)=>{ ctx.textAlign='center'; ctx.fillText(h,cols[i],34); });
  rows.forEach((r,i)=>{
    const ry=50+i*30, isW=r.res==='WIN';
    rr(ctx,20,ry,W-44,28,2,i%2===0?'#c8cedd':BG);
    ctx.font='8.5px sans-serif'; ctx.fillStyle='#334155'; ctx.textAlign='center'; ctx.fillText(String(r.n),cols[0],ry+17);
    ctx.fillStyle=r.dir==='L'?UP:DN; ctx.font='700 8.5px sans-serif'; ctx.fillText(r.dir,cols[1],ry+17);
    ctx.fillStyle='#475569'; ctx.font='8px sans-serif'; ctx.fillText(r.setup,cols[2],ry+17);
    ctx.fillStyle=PURP; ctx.font='8.5px sans-serif'; ctx.fillText(r.rr,cols[3],ry+17);
    rr(ctx,cols[4]-44,ry+5,88,16,3,isW?'#dcfce7':'#fee2e2');
    ctx.fillStyle=isW?UP:DN; ctx.font='900 8.5px sans-serif'; ctx.fillText(r.res,cols[4],ry+17);
  });
  rr(ctx,20,234,W-44,22,4,GRID);
  ctx.font='900 9px sans-serif';
  ctx.fillStyle=UP; ctx.textAlign='center'; ctx.fillText(`Win rate: ${Math.round(wins/rows.length*100)}%`,110,249);
  ctx.fillStyle=PURP; ctx.fillText(`Trades: ${rows.length}`,W/2,249);
  ctx.fillStyle='#64748b'; ctx.font='8px sans-serif'; ctx.fillText(`W:${wins} / L:${rows.length-wins}`,W-PR-20,249);
};

// ── MAP ──
const DRAW_MAP: Record<ChartKind, DrawFn> = {
  liquidity:drawLiquidity, fvg:drawFVG, orderblock:drawOB,
  bos:drawBOS, choch:drawCHOCH, support:drawSupport, resistance:drawResistance,
  uptrend:drawUptrend, downtrend:drawDowntrend, range:drawRange,
  pullback:drawPullback, retest:drawRetest, stoploss:drawSL,
  takeprofit:drawTP, riskreward:drawRR, riskmanagement:drawRM,
  sessions:drawSessions, volume:drawVolume, manipulation:drawManipulation,
  sweep:drawSweep, institutional:drawInstitutional, confirmation:drawConfirmation,
  impulse:drawImpulse, correction:drawCorrection, accumulation:drawAccumulation,
  distribution:drawDistribution, psychology:drawPsychology, journal:drawJournal,
  plan:drawPlan, backtesting:drawBacktesting,
};

function ConceptChart({ concept, mode }: { concept:Concept; mode:'bullish'|'bearish' }) {
  const bull = mode==='bullish';
  const ref  = useRef<HTMLCanvasElement>(null);
  const draw = DRAW_MAP[concept.chartKind];

  useEffect(()=>{
    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext('2d'); if(!ctx) return;
    const W=cv.width, H=cv.height;
    ctx.clearRect(0,0,W,H);
    // rounded bg
    ctx.beginPath();
    ctx.moveTo(8,0); ctx.lineTo(W-8,0); ctx.arcTo(W,0,W,8,8);
    ctx.lineTo(W,H-8); ctx.arcTo(W,H,W-8,H,8);
    ctx.lineTo(8,H); ctx.arcTo(0,H,0,H-8,8);
    ctx.lineTo(0,8); ctx.arcTo(0,0,8,0,8);
    ctx.closePath(); ctx.fillStyle=BG; ctx.fill();
    draw(ctx,W,H,bull);
  },[bull,draw]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-wide text-slate-700 flex items-center gap-2">
          {bull?'EJEMPLO ALCISTA':'EJEMPLO BAJISTA'}
          <span className="text-lg">{bull?'↗':'↘'}</span>
        </h3>
        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${bull?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-700'}`}>
          {bull?'BUY SETUP':'SELL SETUP'}
        </span>
      </div>
      <div className="overflow-hidden rounded-xl aspect-[2/1]">
        <canvas ref={ref} width={520} height={260} className="w-full h-full"/>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════
export default function ConceptosPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState('');
  const selected = concepts.find(c=>c.id===selectedId)??concepts[0];
  const filtered = concepts.filter(c=>{
    const q=query.toLowerCase();
    return c.title.toLowerCase().includes(q)||c.subtitle.toLowerCase().includes(q)||c.tag.toLowerCase().includes(q);
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
                    ?'bg-gradient-to-r from-violet-700 to-violet-600 text-white shadow-[0_0_18px_rgba(124,58,237,0.45)]'
                    :'text-slate-200 hover:bg-white/5 hover:text-white'
                }`}>
                <span>{c.id}. {c.title}</span>
                {selected.id===c.id&&<span className="h-2 w-2 rounded-full bg-violet-200"/>}
              </button>
            ))}
          </div>
          <button onClick={()=>router.push('/dashboard')}
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
