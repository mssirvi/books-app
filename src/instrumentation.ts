import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

const sdk = new NodeSDK({
    serviceName: 'books-app',
    traceExporter: new OTLPTraceExporter({
        // optional - default url is http://localhost:4318/v1/traces
        url: 'http://localhost:4318/v1/traces',
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {},
      }),
      metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
          url: 'http://localhost:4318/v1/metrics', // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
          headers: {}, // an optional object containing custom headers to be sent with each request
        }),
      }),
      instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();