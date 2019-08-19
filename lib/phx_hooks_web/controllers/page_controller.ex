defmodule PhxHooksWeb.PageController do
  use PhxHooksWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def show(conn, params) do
    render(conn, "#{params["id"]}.html")
  end
end
