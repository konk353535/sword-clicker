import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-proto"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"
import { Resource } from "@opentelemetry/resources"
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics"
import { NodeSDK } from "@opentelemetry/sdk-node"
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions"

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "battle-node",
        [SemanticResourceAttributes.SERVICE_VERSION]: "1.0"
    }),
    traceExporter: new OTLPTraceExporter({
        url: "http://localhost:4318/v1/traces"
    }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: "http://localhost:4318/v1/metrics"
        })
    }),
    instrumentations: [getNodeAutoInstrumentations(), new ExpressInstrumentation(), new HttpInstrumentation()]
})

sdk.start()
