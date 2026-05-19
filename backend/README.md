# flima.dev — Quarkus Portfolio Backend API

High-performance, reactive, and secure Java API designed with the **Quarkus** framework. This system exposes endpoints to public clients and a secure set of CRUD endpoints to the portfolio administration dashboard.

---

## 🛠️ Tech Stack & Key Extensions

- **Framework**: Quarkus v3.34+
- **Persistence**: Hibernate ORM (Panache), PostgreSQL, Flyway (for schema migrations)
- **Caching**: Quarkus Cache (Redis Client backing)
- **Security**: SmallRye JWT (Role-Based Access Control)
- **Asynchronous Messaging**: SmallRye Reactive Messaging with Apache Kafka
- **Rate-Limiting**: Bucket4j (Quarkiverse extension)
- **Observability**: Micrometer Registry Prometheus & SmallRye Health Probes

---

## ⚙️ Configuration & Environment

The application configuration resides in `src/main/resources/application.properties`. 

### Key Profiles
* **Prod (Default)**: Leverages Kubernetes service discovery (`redis-service`, `postgres-db`, `kafka-service`). Requires environment variables for secrets.
* **Dev (`%dev`)**: Pre-configured for local developer machine setup (`localhost` targets).
* **Test (`%test`)**: Disables caching (`quarkus.cache.enabled=false`), uses an in-memory H2/PostgreSQL mapping, and mocks SMTP using Quarkus Mailer.

---

## 📦 Cache Management Strategy (Redis)

To ensure high-performance response times on public routes, we use caching:
- Public lists (Experiences, Educations, Projects, Stacks) are annotated with `@CacheResult(cacheName = "...")` to cache results directly in Redis.
- Administrative mutation operations (Create, Update, Delete) are annotated with `@CacheInvalidateAll(cacheName = "...")` to instantly wipe outdated cache records upon admin updates.

---

## 🧪 Testing Suite

We maintain a high-quality test suite containing unit, integration, and transactional boundary tests.

### Running Backend Tests

Run the surefire testing suite:
```bash
./mvnw clean test
```

### Advanced Testing Patterns
* **Mock Mailbox**: Email dispatches are verified in integration tests using Quarkus' built-in `MockMailbox` API instead of hitting real SMTP servers.
* **Kafka Integration**: Kafka events are tested in-memory or using Testcontainers (`StrimziKafkaContainer`) to mock asynchronous pub-sub structures.

---

## ⚡ Packaging and Production JVM Settings

### JVM Resource Configuration
In Kubernetes deployments, the JVM is strictly limited to prevent memory spikes on connection spikes:
```yaml
env:
  - name: JAVA_OPTS
    value: "-XX:+UseG1GC -Xms256m -Xmx512m -XX:MaxRAMPercentage=75.0"
```

### Building the Package
To compile and package the application as an Über-jar:
```bash
./mvnw package -Dquarkus.package.jar.type=uber-jar
```
The compiled runner will be located at `target/*-runner.jar`.
