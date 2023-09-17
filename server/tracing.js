import { DiagConsoleLogger, DiagLogLevel, diag } from "@opentelemetry/api"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { ConsoleMetricExporter, PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics"
import { NodeSDK } from "@opentelemetry/sdk-node"

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO)

const exporterOptions = {
    url: "http://localhost:4318/v1/traces"
}
const traceExporter = new OTLPTraceExporter(exporterOptions)

const sdk = new NodeSDK({
    traceExporter: traceExporter,
    metricReader: new PeriodicExportingMetricReader({
        exporter: new ConsoleMetricExporter()
    }),
    instrumentations: [getNodeAutoInstrumentations()]
})

sdk.start()
