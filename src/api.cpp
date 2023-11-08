#include "crow.h"
#include "db.cpp"
#include "utils/fileUtils.cpp"
#include "utils/linkUtils.cpp"

class API {
  Database db;

 public:
  std::string genJson(URLData* url, const char status_msg[]) {
    if (url == nullptr) {
      return crow::json::wvalue({{"status_msg", status_msg}}).dump();
    } else {
      return crow::json::wvalue({{"main_url", (DOMAIN + '/' + url->suffix)},
                                 {"url_suffix", url->suffix},
                                 {"secret_key", url->secret_key},
                                 {"status_msg", status_msg}})
          .dump();
    }
  }

  void start() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/")
    ([]() {
      auto page = crow::mustache::load("index.html");
      return page.render();
    });

    CROW_ROUTE(app, "/404")
    ([]() {
      auto page = crow::mustache::load("404.html");
      return page.render();
    });

    // https://stackoverflow.com/a/26903867
    CROW_ROUTE(app, "/api/add")
        .methods(crow::HTTPMethod::POST)([&](const crow::request& req) {
          auto data = crow::json::load(req.body);

          if (!data || data["main_url"].size() == 0) {
            return crow::response(404, genJson(nullptr, "NO_DATA_RECIEVED"));
          }

          URLData url;
          url.main = data["main_url"].s();
          url.suffix = data["url_suffix"].s();
          url.secret_key = genShortUrlId(SECRET_KEY_SIZE);

          if (url.suffix.empty()) {
            url.suffix = genShortUrlId();
          } else {
            if (db.check(url)) {
              return crow::response(404, genJson(&url, "URL_SUFFIX_EXISTS"));
            }
          }

          if (db.add(url)) {
            return crow::response(200, genJson(&url, "URL_GEN_SUCCESS"));
          } else {
            return crow::response(404, genJson(&url, "URL_GEN_FAILED"));
          }

          return crow::response{200, genJson(&url, "URL_GEN_SUCCESS")};
        });

    // https://stackoverflow.com/a/26903867
    CROW_ROUTE(app, "/api/delete")
        .methods(crow::HTTPMethod::POST)([&](const crow::request& req) {
          auto data = crow::json::load(req.body);

          if (!data || data["secret_key"].size() == 0) {
            return crow::response(404, genJson(nullptr, "NO_DATA_RECIEVED"));
          } else if (data["secret_key"].size() != SECRET_KEY_SIZE) {
            return crow::response(404, genJson(nullptr, "WRONG_SECRET_KEY"));
          } else if (data["url_suffix"].size() != URL_SUFFIX_SIZE) {
            return crow::response(404, genJson(nullptr, "INVALID_SHORT_URL"));
          }

          URLData url;
          url.suffix = data["url_suffix"].s();
          url.secret_key = data["secret_key"].s();

          URLData result = db.get(url);

          if (result.secret_key != url.secret_key) {
            return crow::response(404, genJson(nullptr, "WRONG_SECRET_KEY"));
          } else {
            if (db.del(result)) {
              return crow::response(200, genJson(nullptr, "URL_DEL_SUCCESS"));
            } else {
              return crow::response(404, genJson(nullptr, "URL_DEL_FAILED"));
            }
          }

          return crow::response{200, genJson(&url, "URL_DEL_SUCCESS")};
        });

    CROW_ROUTE(app, "/<string>")
        .methods(crow::HTTPMethod::GET)(
            [&](crow::response& res, std::string url_suffix) {
              if (url_suffix.size() != URL_SUFFIX_SIZE) {
                res.code = 404;
                res.write("INVALID_SHORT_URL");
                res.end();
              }

              URLData url;
              url.suffix = url_suffix;

              URLData result = db.get(url);

              if (result.main.empty()) {
                res.redirect("/404");
              } else {
                res.redirect(result.main);
              }

              res.end();
              // return crow::response{200};
            });

    app.port(PORT).multithreaded().run_async();
  }
};