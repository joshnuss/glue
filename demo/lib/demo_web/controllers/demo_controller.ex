defmodule DemoWeb.DemoController do
  use DemoWeb, :controller

  def show(conn, params) do
    render(conn, "#{params["id"]}.html")
  end
end
