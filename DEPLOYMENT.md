# Deployment Instructions (Render.com)

We have set up a **Render Blueprint** configuration to automate deployment. This will deploy both the frontend (React + Nginx) and backend (Spring Boot + PostgreSQL) in under 15 minutes.

## Prerequisites
- A [Render.com](https://render.com) account.
- A GitHub repository with this code pushed.

## Steps

1.  **Push Code to GitHub**:
    Ensure all changes (especially `render.yaml`, `Dockerfile.frontend`, `nginx.conf`) are committed and pushed to your repository.

2.  **Create New Blueprint on Render**:
    -   Go to your [Render Dashboard](https://dashboard.render.com).
    -   Click **New +** and select **Blueprint**.
    -   Connect your GitHub repository.
    -   Give the Blueprint a name (e.g., `portfolio-stack`).
    -   Click **Apply**.

3.  **Wait for Deployment**:
    -   Render will automatically detect `render.yaml`.
    -   It will create:
        -   A **PostgreSQL Database**.
        -   A **Backend Service** (Spring Boot).
        -   A **Frontend Service** (React + Nginx).
    -   The `API_URL` environment variable is automatically wired so the frontend can talk to the backend.

4.  **Access Your Site**:
    -   Once deployment is marked live, click the URL for the **Frontend Service**.
    -   Your portfolio is now live!

## Environment Variables
-   **Backend**: 
    -   `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`: Auto-configured by Render.
    -   `ADMIN_USERNAME`, `ADMIN_PASSWORD`: Auto-generated strings. Check the Render dashboard service environment tab to view them if needed (or override them).
    -   `GEMINI_API_KEY`: Uses the default key in `application.properties`. Add this variable in Render Dashboard if you want securely override it.
-   **Frontend**:
    -   `API_URL`: Automatically set to the backend URL.

## Troubleshooting
-   **Logs**: Check the logs for the respective service in Render dashboard if deployment fails.
-   **DB Connection**: Ensure the database is healthy.
