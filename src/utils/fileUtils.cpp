#include <fstream>
#include <string>

#include "common.hpp"
#include "status_codes.h"

const char main_file_name[] = "test_data.csv";
const char temp_file_name[] = "temp_test_data.csv";

// bool is_url_exist(URLData url) {}

void csvTobin(std::fstream &file) {}
void binTocsv(std::fstream &file) {}

int insert_url(URLData url) {
  std::fstream file;
  file.open(main_file_name, std::ios::app);
  file << url.suffix << "," << url.main << "\n";
  file.close();

  return URL_INSERTED_SUCCESSFULLY;
}

/*
Delete a url from the file.

The main url gets removed only keeping the shortened one
later if user tries to access they will get a message about
the deletion of url.

@params url (URLData)
@return (bool) - true if url was deleted or false if deletion was failed.
*/
int delete_url(URLData url) {
  // if (is_url_exist(url)) return URL_EXISTS;

  bool is_deleted = false;
  std::string line;
  std::ofstream temp;
  std::ifstream file;

  temp.open(temp_file_name, std::ios::app);
  file.open(main_file_name, std::ios::out);

  // https://stackoverflow.com/q/5605125
  // https://stackoverflow.com/a/26953529
  while (std::getline(file, line)) {
    std::string tmp_main = line.substr(line.find(',') + 1, line.back());

    if (tmp_main == url.main) {
      // remove the main url keeping the shortened url.
      line.replace(line.find(',') + 1, line.back(), "");
      temp << line << "\n";
      is_deleted = true;
    } else {
      temp << line << "\n";
    }
  }

  temp.close();
  file.close();

  std::remove(main_file_name);
  std::rename(temp_file_name, main_file_name);

  return (is_deleted) ? URL_DELETED_SUCCESSFULLY : URL_DELETION_FAILED;
}
